import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, PontoTuristico } from '../../services/api.service';
import { RodapeComponent } from '../rodape/rodape.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';

@Component({
  selector: 'app-busca',
  imports: [CabecalhoComponent, RodapeComponent, CommonModule, FormsModule],
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit {
  ufSelecionada: string = 'BA';
  cidadeSelecionada: string | null = null;
  pontosTuristicos: PontoTuristico[] = [];

  paginaAtual = 1;
  itensPorPagina = 4;
  totalPaginas = 1;
  pontosPagina: PontoTuristico[] = [];

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.cidadeSelecionada = params.get('cidade');
      if (this.cidadeSelecionada) {
        this.buscarPontos();
      }
    });
  }

  buscarPontos() {
    if (!this.cidadeSelecionada) return;

    this.api.getPontosPorCidade(this.cidadeSelecionada).subscribe({
      next: (dados) => {
        this.pontosTuristicos = dados;
        this.totalPaginas = Math.ceil(this.pontosTuristicos.length / this.itensPorPagina);
        this.paginaAtual = 1;
        this.atualizarPontosPagina();
      },
      error: (err) => {
        console.error(err);
        this.pontosTuristicos = [];
        this.pontosPagina = [];
      }
    });
  }

  atualizarPontosPagina() {
    const start = (this.paginaAtual - 1) * this.itensPorPagina;
    this.pontosPagina = this.pontosTuristicos.slice(start, start + this.itensPorPagina);
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarPontosPagina();
    }
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.atualizarPontosPagina();
    }
  }

  verDetalhes(ponto: PontoTuristico) {
    this.router.navigate(['/detalhes', ponto.placeId]);
  }

  handleImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.src = 'https://via.placeholder.com/400x300?text=Imagem+indisponível';
}



  
}