import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/shared/services/produto.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CategoriaService } from 'src/app/shared/services/categoria.service';

@Component({
  selector: 'app-produto-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.scss'],
})
export class ProdutoCreateComponent implements OnInit {
  produtoForm: FormGroup;
  categorias: any[] = [];

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) {
    this.produtoForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(5)]),
      descricao: new FormControl('', [Validators.required]),
      valor: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d+(\\.\\d{1,2})?$'),
      ]),
      categoria: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.categoriaService.findAll().subscribe(
      (categorias) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Erro ao carregar categorias', error);
      }
    );
  }

  public cancel(): void {
    this.router.navigate(['/produto']);
  }

  public create(): void {
    if (this.produtoForm.valid) {
      const produtoData: Produto = {
        ...this.produtoForm.value,
        valor: Number(this.produtoForm.value.valor),
        categoria: { id: this.produtoForm.value.categoria },
      };

      this.produtoService.create(produtoData).subscribe(
        (resposta) => {
          this.router.navigate(['produto']);
        },
        (err) => {
          console.error('Erro na criação:', err);
        }
      );
    } else {
      console.warn('Formulário inválido:', this.produtoForm.errors);
    }
  }
}
