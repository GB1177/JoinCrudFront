import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/app/environments/environment";
import { Categoria } from "src/app/models/categoria.model";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  baseUrl: String = environment.apiUrl;

  constructor(private http: HttpClient, ) {}

  public findAll(): Observable<Categoria[]> {
    const url = this.baseUrl + '/categoria';
    return this.http.get<Categoria[]>(url);
  }

  public findById(id: any): Observable<Categoria> {
    const url = `${this.baseUrl}/categoria/${id}`;
    return this.http.get<Categoria>(url);
  }

  public create(categoria: Categoria): Observable<Categoria> {
    const url = this.baseUrl + '/categoria';
    return this.http.post<Categoria>(url, categoria);
  }

  public update(categoria: Categoria): Observable<Categoria> {
    const url = `${this.baseUrl}/categoria/${categoria.id}`;
    return this.http.put<Categoria>(url, categoria);
  }

  public delete(id: any): Observable<void> {
    const url = `${this.baseUrl}/categoria/${id}`;
    return this.http.delete<void>(url);
  }
}
