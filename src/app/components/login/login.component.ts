import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RodapeComponent } from '../rodape/rodape.component';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RodapeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  formLogin: FormGroup;
  mostrar = false;
  erroLogin: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    const dadosLogin = this.formLogin.value;

    this.http.post(`${environment.apiUrl}/login`, dadosLogin).subscribe({
      next: (res: any) => {
        this.erroLogin = null;
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        this.erroLogin = err.error?.mensagem || 'Erro ao fazer login';
      }
    });
  }

  mostrasenha(inputSenha: HTMLInputElement): void {
    this.mostrar = !this.mostrar;
    inputSenha.type = this.mostrar ? 'text' : 'password';
  }
}
