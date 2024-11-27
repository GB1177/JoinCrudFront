import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutoService } from 'src/app/shared/services/produto.service';
import { Produto } from 'src/app/models/produto.model';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { Categoria } from 'src/app/models/categoria.model';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-produto-update',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
  ],
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.scss'],
})
export class ProdutoUpdateComponent implements OnInit {
  id_produto = '';
  produtoForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private router: Router,
    private service: ProdutoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute
  ) {
    this.produtoForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(5)]),
      descricao: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required, Validators.min(0)]),
      categoriaId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.id_produto = this.route.snapshot.paramMap.get('id')!;
    this.findById();
    this.loadCategorias();
  }

  private loadCategorias(): void {
    this.categoriaService.findAll().subscribe(
      (categorias: Categoria[]) => {
        this.categorias = categorias;
      },
      (err) => {
        console.error('Erro ao carregar categorias', err);
      }
    );
  }

  public update(): void {
    if (this.produtoForm.valid) {
      const updatedProduto: Produto = {
        id: this.id_produto,
        nome: this.produtoForm.value.nome,
        descricao: this.produtoForm.value.descricao,
        valor: Number(this.produtoForm.value.valor),
        categoria: {
          id: this.produtoForm.value.categoriaId,
          nome: '',
        },
      };

      this.service.update(updatedProduto).subscribe(
        (resposta) => {
          this.router.navigate(['produto']);
        },
        (err) => {
          console.error('Erro ao atualizar produto:', err);
        }
      );
    } else {
      console.warn('Formulário inválido:', this.produtoForm.errors);
    }
  }

  public cancel(): void {
    this.router.navigate(['/produto']);
  }

  private findById(): void {
    this.service.findById(this.id_produto).subscribe((resposta: Produto) => {
      this.produtoForm.setValue({
        nome: resposta.nome || '',
        descricao: resposta.descricao || '',
        valor: resposta.valor || 0,
        categoriaId: resposta.categoria?.id || '',
      });
    });
  }
}
