import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { RodapeComponent } from '../rodape/rodape.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  imports: [CabecalhoComponent, RodapeComponent, CommonModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent {
  cidadeSelecionada: string = '';

  constructor(private router: Router) {}

  buscarPontos() {
    if (!this.cidadeSelecionada) {
      alert('Selecione uma cidade');
      return;
    }

    this.router.navigate(['/busca'], { queryParams: { cidade: this.cidadeSelecionada } });
  }
}
