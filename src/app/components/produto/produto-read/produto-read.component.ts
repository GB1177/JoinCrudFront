import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from 'src/app/shared/services/produto.service';
import { Router, RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Produto } from 'src/app/models/produto.model';

@Component({
  selector: 'app-produto-read',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './produto-read.component.html',
  styleUrls: ['./produto-read.component.scss'],
})
export class ProdutoReadComponent implements AfterViewInit {
  constructor(private router: Router, private service: ProdutoService) {
    this.router.navigate(['/produto']);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  produtos: Produto[] = [];

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  dataSource = new MatTableDataSource<Produto>(this.produtos);
  displayedColumns: string[] = ['nomeProduto', 'descricao', 'valor', 'acao'];

  public findAll(): void {
    this.service.findAll().subscribe(
      (response) => {
        this.produtos = response;
        this.dataSource = new MatTableDataSource<Produto>(this.produtos);
        this.dataSource.paginator = this.paginator;
        console.log(this.produtos);
      },
      (error) => {
        console.log('error:', error);
      }
    );
  }

  public navigateToCreate(): void {
    this.router.navigate(['/produto/create']);
  }
}