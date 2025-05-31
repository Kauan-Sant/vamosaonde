import { Injectable, StreamingResourceOptions } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export interface PontoTuristico {
  nome: string;
  endereco: string;
  avaliacao: number;
  totalAvaliacoes: number;
  localizacao: { lat: number; lng: number };
  fotos: string[];
  placeId: string;
  descricao: string;
}


@Injectable({
  providedIn: 'root'
})

export class ApiService {   
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }


  cadastrar(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro`, dados);
  }

  getCidades(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/cidades`);
  }

  getPontosPorCidade(cidade: string): Observable<PontoTuristico[]> {
    return this.http.get<PontoTuristico[]>(`${this.apiUrl}/cidades/${cidade}/pontos`);
  }

  getPontoPorNome(nome: string) {
    return this.http.get<PontoTuristico>(`${this.apiUrl}/pontos/${encodeURIComponent(nome)}`);
    }

  getPontoPorPlaceId(placeId: string) {
    return this.http.get<PontoTuristico>(`${this.apiUrl}/pontos/id/${placeId}`);
  }


}
