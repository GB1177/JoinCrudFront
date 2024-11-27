import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProdutoService } from 'src/app/shared/services/produto.service';
import { Produto } from 'src/app/models/produto.model';


@Component({
  selector: 'app-produto-delete',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.scss'],
})
export class ProdutoDeleteComponent {
  id_produto = '';

  produto: Produto = {
    id: '',
    nome: '',
    descricao: '',
    valor: 0,
    categoria: { id: 0, nome: '' },
  };

  constructor(
    private router: Router,
    private service: ProdutoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id_produto = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  public delete(): void {
    this.service.delete(this.id_produto).subscribe(
      (resposta) => {
        this.router.navigate(['produto']);
      },
      (err) => {
        console.error('Erro ao deletar:', err);
        alert('Erro ao deletar o produto!');
      }
    );
  }

  public cancel(): void {
    this.router.navigate(['produto']);
  }

  private findById(): void {
    this.service.findById(this.id_produto).subscribe(
      (resposta) => {
        this.produto = resposta;
      },
      (err) => {
        console.error('Erro ao buscar produto:', err);
        alert('Produto não encontrado!');
      }
    );
  }
}
