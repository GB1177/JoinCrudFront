import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutoService } from 'src/app/shared/services/produto.service';
@Component({
  selector: 'app-produto-update',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.scss'],
})
export class ProdutoUpdateComponent {
  id_produto = '';

  constructor(
    private router: Router,
    private service: ProdutoService,
    private route: ActivatedRoute
  ) {}

  produtoControl = new FormControl('', [Validators.minLength(5)]);

  ngOnInit(): void {
    this.id_produto = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  public update(): void {
    if (this.produtoControl.valid) {
      const updatedProduto = {
        id: this.id_produto,
        produtoNome: this.produtoControl.value || '',
        descricao: this.produtoControl.value || '',
        valor: this.produtoControl.value || '',
      };

      this.service.update(updatedProduto).subscribe(
        (resposta) => {
          this.router.navigate(['produto']);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

  public cancel(): void {
    this.router.navigate(['/produto']);
  }

  private findById(): void {
    this.service.findById(this.id_produto).subscribe((resposta) => {
      this.produtoControl.setValue(resposta.produtoNome || null);
    });
  }
}

