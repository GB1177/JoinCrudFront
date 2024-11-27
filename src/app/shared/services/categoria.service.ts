import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/app/environments/environment";
import { Categoria } from "src/app/models/categoria.model";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public findAll(): Observable<Categoria[]> {
    const url = `${this.baseUrl}/categorias`;
    return this.http.get<Categoria[]>(url);
  }

  public findById(id: any): Observable<Categoria> {
    const url = `${this.baseUrl}/categorias/${id}`;
    return this.http.get<Categoria>(url);
  }

  public create(categorias: Categoria): Observable<Categoria> {
    const url = this.baseUrl + '/categorias';
    return this.http.post<Categoria>(url, categorias);
  }

  public update(categorias: Categoria): Observable<Categoria> {
    const url = `${this.baseUrl}/categorias/${categorias.id}`;
    return this.http.put<Categoria>(url, categorias);
  }

  public delete(id: any): Observable<void> {
    const url = `${this.baseUrl}/categorias/${id}`;
    return this.http.delete<void>(url);
  }
}
