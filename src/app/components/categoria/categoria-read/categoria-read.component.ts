import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/shared/services/categoria.service';

@Component({
  selector: 'app-categoria-read',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
  ],
  providers: [CategoriaService],
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.scss'],
})
export class CategoriaReadComponent implements AfterViewInit {
  constructor(private router: Router, private service: CategoriaService) {
    this.router.navigate(['/categoria']);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public categorias: Categoria[] = [];
  dataSource = new MatTableDataSource<Categoria>([]);
  displayedColumns: string[] = ['nome', 'acao'];

  ngOnInit(): void {
    this.findAll();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public findAll(): void {
    this.service.findAll().subscribe(
      (response) => {
        this.categorias = response;
        this.categorias.sort((a, b) => a.nome.localeCompare(b.nome));
        this.dataSource.data = this.categorias;
      },
      (error) => {
        console.error('Erro ao buscar categorias:', error);
      }
    );
  }

  public navigateToCreate(): void {
    this.router.navigate(['/categoria/create']);
  }
}
