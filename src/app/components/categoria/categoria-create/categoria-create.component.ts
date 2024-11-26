import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/shared/services/categoria.service';

@Component({
  selector: 'app-categoria-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.scss'],
})
export class CategoriaCreateComponent {
  constructor(private router: Router, private service: CategoriaService) {}

  categoria: Categoria = {
    id: '',
    categoriaNome: '',
  };

  categoriaControl = new FormControl('', [Validators.minLength(5)]);

  public cancel(): void {
    this.router.navigate(['/categoria']);
  }

  public create(): void {
    this.service.create(this.categoria).subscribe(
      (resposta) => {
        this.router.navigate(['categoria']);
      },
      (err) => {
        if (err.error.error.match('já cadastrado')) {
        }
      }
    );
  }
}
