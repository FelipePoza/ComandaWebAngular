import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Comanda } from 'src/model/comanda';
import { Usuario } from 'src/model/usuario';

const apiUrl = 'https://localhost:44390/api/comanda';
const apiLoginUrl = 'https://localhost:44390/api/autoriza/login';
var token ='';
var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  montaHeaderToken() {
    token = localStorage.getItem("jwt");
    console.log('jwt header token ' + token);
    httpOptions = {headers: new HttpHeaders({"Authorization": "Bearer " + token,"Content-Type": "application/json"})};
  }

  Login (Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(apiLoginUrl, Usuario).pipe(
      tap((Usuario: Usuario) => console.log(`Login usuario com email =${Usuario.email}`)),
      catchError(this.handleError<Usuario>('Login'))
    );
  }

  listarComandas (): Observable<Comanda[]> {
    this.montaHeaderToken();
    console.log(httpOptions.headers);
    return this.http.get<Comanda[]>(apiUrl, httpOptions)
      .pipe(
        tap(Comanda => console.log('leu as comandas')),
        catchError(this.handleError('listarComanda', []))
      );
  }

  listarComanda(id: number): Observable<Comanda> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Comanda>(url, httpOptions).pipe(
      tap(_ => console.log(`leu a Comanda id=${id}`)),
      catchError(this.handleError<Comanda>(`listarComanda id=${id}`))
    );
  }

  adicionarComanda (Comanda): Observable<Comanda> {
    this.montaHeaderToken();
    return this.http.post<Comanda>(apiUrl, Comanda, httpOptions).pipe(
      tap((Comanda: Comanda) => console.log(`adicionou a Comanda com w/ id=${Comanda.Id}`)),
      catchError(this.handleError<Comanda>('adicionarComanda'))
    );
  }

  atualizarComanda(id, Comanda): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Comanda, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${id}`)),
      catchError(this.handleError<any>('atualizarComanda'))
    );
  }

  removerComanda (id): Observable<Comanda> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Comanda>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o Comanda com id=${id}`)),
      catchError(this.handleError<Comanda>('deletarComanda'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}