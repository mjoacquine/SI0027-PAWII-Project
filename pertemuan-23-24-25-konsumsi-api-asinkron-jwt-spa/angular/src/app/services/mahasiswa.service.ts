// Mini Project - Pertemuan 23-24-25: Service untuk konsumsi API Mahasiswa
// TODO 1: lengkapi method getAll() dan create() di bawah ini.

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Mahasiswa } from '../mahasiswa.model';

@Injectable({ providedIn: 'root' })
export class MahasiswaService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  getAll() {
    return this.http.get<{ data: Mahasiswa[] }>(`${this.baseUrl}/mahasiswa`);
  }

  create(mahasiswa: { nama: string; nim: string }) {
    return this.http.post<Mahasiswa>(`${this.baseUrl}/mahasiswa`, mahasiswa);
  }
}