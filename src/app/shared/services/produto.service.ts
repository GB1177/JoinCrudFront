import { Produto } from './../../models/produto.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public findAll(): Observable<Produto[]> {
    const url = this.baseUrl + '/produtos';
    return this.http.get<Produto[]>(url);
  }

  public findById(id: any): Observable<Produto> {
    const url = `${this.baseUrl}/produtos/${id}`;
    return this.http.get<Produto>(url);
  }

  public create(produto: Produto): Observable<Produto> {
    const url = this.baseUrl + '/produtos';
    return this.http.post<Produto>(url, produto).pipe(
      catchError((error) => {
        console.error('Erro ao criar produto', error);
        return throwError(() => new Error('Erro ao criar produto.'));
      })
    );
  }

  public update(produto: Produto): Observable<Produto> {
    const url = `${this.baseUrl}/produtos/${produto.id}`;
    return this.http.put<Produto>(url, produto);
  }

  public delete(id: any): Observable<void> {
    const url = `${this.baseUrl}/produtos/${id}`;
    return this.http.delete<void>(url);
  }

  public findAllCategorias(): Observable<any[]> {
    const url = this.baseUrl + '/categorias';
    return this.http.get<any[]>(url).pipe(
      catchError((error) => {
        console.error('Erro ao buscar categorias', error);
        return throwError(() => new Error('Erro ao buscar categorias.'));
      })
    );
  }
}
