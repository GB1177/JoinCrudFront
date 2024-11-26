import { Produto } from './../../models/produto.model';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/app/environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  baseUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public findAll(): Observable<Produto[]> {
    console.log(this.baseUrl + '/produto');

    const url = this.baseUrl + '/produto';
    return this.http.get<Produto[]>(url);
  }

  public findById(id: any): Observable<Produto> {
    const url = `${this.baseUrl}/produto/${id}`;
    return this.http.get<Produto>(url);
  }

  public create(produto: Produto): Observable<Produto> {
    const url = this.baseUrl + '/produto';
    return this.http.post<Produto>(url, produto);
  }

  public update(produto: Produto): Observable<Produto> {
    const url = `${this.baseUrl}/produto/${produto.id}`;
    return this.http.put<Produto>(url, produto);
  }

  public delete(id: any): Observable<void> {
    const url = `${this.baseUrl}/produto/${id}`;
    return this.http.delete<void>(url);
  }
  
}
