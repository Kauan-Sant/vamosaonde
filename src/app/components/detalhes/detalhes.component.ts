import { Component, OnInit } from '@angular/core';
import { ApiService, PontoTuristico } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { RodapeComponent } from '../rodape/rodape.component';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-detalhes',
  imports: [CabecalhoComponent, CommonModule, RodapeComponent, GoogleMapsModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent implements OnInit {
  nome: string | null = null;
  ponto: PontoTuristico | null = null;
  carregando: boolean = true;
  erro: string | null = null;
  fotoAtual = 0;


  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    const placeId = this.route.snapshot.paramMap.get('placeId');
    if (placeId) {
      this.api.getPontoPorPlaceId(placeId).subscribe({
        next: (ponto) => {
          this.ponto = ponto;
          this.carregando = false;
        },
        error: () => {
          this.carregando = false;
          this.erro = 'Ponto turístico não encontrado.';
        }
      });
    }
  }

  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'satellite',
    zoom: 15,
  };



  abrirNoMaps() {
    if (this.ponto?.placeId) {
      const url = `https://www.google.com/maps/place/?q=place_id:${this.ponto.placeId}`;
      window.open(url, '_blank');
    }
  }

  avancarFoto() {
    if (this.ponto?.fotos?.length) {
      this.fotoAtual = (this.fotoAtual + 1) % this.ponto.fotos.length;
    }
  }

  voltarFoto() {
    if (this.ponto?.fotos?.length) {
      this.fotoAtual = (this.fotoAtual - 1 + this.ponto.fotos.length) % this.ponto.fotos.length;
    }
  }

  irParaFoto(index: number) {
    this.fotoAtual = index;
  }


}