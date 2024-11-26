import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/shared/services/produto.service';

@Component({
  selector: 'app-produto-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.scss'],
})
export class ProdutoCreateComponent {
  constructor(private router: Router, private service: ProdutoService) {}

  produto: Produto = {
    id: '',
    produtoNome: '',
    descricao: '',
    valor: '',
  };

  produtoControl = new FormControl('', [Validators.minLength(5)]);

  public cancel(): void {
    this.router.navigate(['/produto']);
  }

  public create(): void {
    this.service.create(this.produto).subscribe(
      (resposta) => {
        this.router.navigate(['produto']);
      },
      (err) => {
        if (err.error.error.match('já cadastrado')) {
        }
      }
    );
  }
}
