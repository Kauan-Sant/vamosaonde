import { Component } from '@angular/core';
import { RodapeComponent } from '../components/rodape/rodape.component';
import { NgxMaskDirective } from 'ngx-mask';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RodapeComponent, NgxMaskDirective, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})


export class CadastroComponent {
  form: FormGroup;
  mensagemSucesso: string | null = null;
  mensagemErro: string | null = null;
  mostrar = false;
  mostrar1 = false;
  apiUrl = environment.apiUrl;

  constructor(private fb: FormBuilder, private http: HttpClient,  private router: Router) {
    this.form = this.fb.group(
      {
        nome: ['', Validators.required],
        sobrenome: ['', Validators.required],
        cpf: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', Validators.required]
      },
      { validators: this.senhasIguais }
    );
  }

  senhasIguais(formGroup: FormGroup) {
    const senha = formGroup.get('senha')?.value;
    const confirmar = formGroup.get('confirmarSenha')?.value;
    return senha === confirmar ? null : { senhasDiferentes: true };
  }

  get confirmarSenha() {
    return this.form.get('confirmarSenha');
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.http.post(`${this.apiUrl}/cadastro`, this.form.value).subscribe({
      next: (res: any) => {
        this.mensagemSucesso = res.mensagem || 'Cadastro realizado com sucesso!';
        this.mensagemErro = null;
        this.form.reset();
      },
      error: (err) => {
        this.mensagemErro = err.error?.mensagem || 'Erro no cadastro. Tente novamente.';
        this.mensagemSucesso = null;
      }
    });
  }

  mostrasenha(inputSenha: HTMLInputElement): void {
    this.mostrar = !this.mostrar;
    inputSenha.type = this.mostrar ? 'text' : 'password';
  }

  mostrasenha1(inputSenha: HTMLInputElement): void {
    this.mostrar1 = !this.mostrar1;
    inputSenha.type = this.mostrar1 ? 'text' : 'password';
  }
}