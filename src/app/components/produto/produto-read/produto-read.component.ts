import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class ProdutoReadComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  produtos: Produto[] = [];
  dataSource = new MatTableDataSource<Produto>([]);
  displayedColumns: string[] = ['nomeProduto', 'descricao', 'valor', 'acao'];

  constructor(private router: Router, private service: ProdutoService) {}

  ngOnInit(): void {
    this.findAll();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public findAll(): void {
    this.service.findAll().subscribe(
      (response) => {
        this.produtos = response;
        this.produtos.sort((a, b) => a.nome.localeCompare(b.nome));
        this.dataSource.data = this.produtos;
      },
      (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  public navigateToCreate(): void {
    this.router.navigate(['/produto/create']);
  }
}
