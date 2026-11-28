// Mini Project - Pertemuan 23-24-25: Login dari SPA & menyimpan token JWT
// TODO 2: lengkapi AuthService.login() (lihat services/auth.service.ts) dan onSubmit() di bawah ini.

import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  private authService = inject(AuthService);

  @Output() loginBerhasil = new EventEmitter<void>();

  username = '';
  password = '';
  error = '';

  onSubmit() {
    this.error = '';
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
        }
        this.loginBerhasil.emit();
      },
      error: () => {
        this.error = 'Username/password salah';
      },
    });
  }
}