import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  dataSource = new MatTableDataSource<Categoria>(this.categorias);
  displayedColumns: string[] = ['categoriaNome', 'descricao', 'acao'];

  public findAll(): void {
    this.service.findAll().subscribe(
      (response) => {
        this.categorias = response;
        this.dataSource = new MatTableDataSource<Categoria>(this.categorias);
        this.dataSource.paginator = this.paginator;
        console.log(this.categorias);
      },
      (error) => {
        console.log('error:', error);
      }
    );
  }

  public navigateToCreate(): void {
    this.router.navigate(['/categoria/create']);
  }
}
