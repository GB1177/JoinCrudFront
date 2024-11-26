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
import { CategoriaService } from 'src/app/shared/services/categoria.service';

@Component({
  selector: 'app-categoria-update',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.scss'],
})
export class CategoriaUpdateComponent {
  id_category = '';

  constructor(
    private router: Router,
    private service: CategoriaService,
    private route: ActivatedRoute
  ) {}

  categoriaControl = new FormControl('', [Validators.minLength(5)]);

  ngOnInit(): void {
    this.id_category = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  public update(): void {
    if (this.categoriaControl.valid) {
      const updatedCategoria = {
        id: this.id_category,
        categoriaNome: this.categoriaControl.value || '',
      };

      this.service.update(updatedCategoria).subscribe(
        (resposta) => {
          this.router.navigate(['categoria']);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

  public cancel(): void {
    this.router.navigate(['/categoria']);
  }

  private findById(): void {
    this.service.findById(this.id_category).subscribe((resposta) => {
      this.categoriaControl.setValue(resposta.categoriaNome || null);
    });
  }
}
