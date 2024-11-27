import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { Categoria } from 'src/app/models/categoria.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-categoria-delete',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.scss'],
})
export class CategoriaDeleteComponent {
  id_category = '';

  categoria: Categoria = {
    id: '',
    nome: '',
  };

  constructor(
    private router: Router,
    private service: CategoriaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id_category = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  public delete(): void {
    this.service.delete(this.id_category).subscribe(
      (resposta) => {
        this.router.navigate(['categoria']);
      },
      (err) => {
        if (err.error.error.match('erro ao deletar categoria')) {
        }
        console.log(err);
      }
    );
  }

  public cancel(): void {
    this.router.navigate(['categoria']);
  }

  private findById(): void {
    this.service.findById(this.id_category).subscribe((resposta) => {
      this.categoria = resposta;
    });
  }
}
