import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { RodapeComponent } from '../rodape/rodape.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contato',
  imports: [CabecalhoComponent, RodapeComponent, GoogleMapsModule, NgxMaskDirective, FormsModule],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  aceitoTermos = false;

  center: google.maps.LatLngLiteral = {
    lat: -12.973055,
    lng: -38.510918
  };

  checar() {
  if (this.aceitoTermos) {
    console.log('Selecionado ✅');
  } else {
    console.log('Não selecionado ❌');
  }
}
}
