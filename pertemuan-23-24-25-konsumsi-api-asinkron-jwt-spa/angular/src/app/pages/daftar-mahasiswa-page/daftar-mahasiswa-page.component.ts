import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MahasiswaFormComponent } from '../../components/mahasiswa-form/mahasiswa-form.component';
import { MahasiswaListComponent } from '../../components/mahasiswa-list/mahasiswa-list.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { MahasiswaService } from '../../services/mahasiswa.service';
import { AuthService } from '../../services/auth.service';
import { Mahasiswa } from '../../mahasiswa.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-daftar-mahasiswa-page',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    MahasiswaFormComponent,
    MahasiswaListComponent,
    LoginFormComponent,
  ],
  templateUrl: './daftar-mahasiswa-page.component.html',
})
export class DaftarMahasiswaPageComponent implements OnInit {
  private mahasiswaService = inject(MahasiswaService);
  private authService = inject(AuthService);

  apiBaseUrl = environment.apiBaseUrl;
  keyword = '';
  mahasiswa: Mahasiswa[] = [];
  loading = true;
  error = '';
  isLoggedIn = this.authService.isLoggedIn();

  ngOnInit() {
    this.mahasiswaService.getAll().subscribe({
      next: (res) => {
        this.mahasiswa = res.data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Gagal memuat data mahasiswa';
        this.loading = false;
      },
    });
  }

  get mahasiswaTersaring(): Mahasiswa[] {
    return this.mahasiswa.filter((m) =>
      m.nama.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }

  onSearch(keyword: string) {
    this.keyword = keyword;
  }

  onTambah(mahasiswaBaru: { nama: string; nim: string }) {
    this.mahasiswaService.create(mahasiswaBaru).subscribe({
      next: (res) => {
        this.mahasiswa = [...this.mahasiswa, res];
      },
      error: () => {
        alert('Gagal menambah data (pastikan Anda sudah login)');
      },
    });
  }

  onLogout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}