import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { BuscaComponent } from './components/busca/busca.component';
import { ContatoComponent } from './components/contato/contato.component';
import { TermosComponent } from './components/termos/termos.component';

export const routes: Routes = [
    { path: 'cadastro', component: CadastroComponent },
    { path: 'login', component: LoginComponent },
    { path: 'inicio', component: InicioComponent },
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'busca', component: BuscaComponent },
    { path: 'detalhes/:placeId', loadComponent: () => import('./components/detalhes/detalhes.component').then(m => m.DetalhesComponent) },
    { path: 'contato', component: ContatoComponent },
    { path: 'termos', component: TermosComponent},
    { path: 'cadastro', component: ContatoComponent }

];
