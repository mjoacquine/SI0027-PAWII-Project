// Mini Project - Pertemuan 17-18: Komponen anak, menerima data lewat @Input
// TODO 1: lengkapi komponen ini agar menerima nama & nim, lalu tampilkan pada template.

import { Component } from '@angular/core';

@Component({
  selector: 'app-mahasiswa-card',
  standalone: true,
  templateUrl: './mahasiswa-card.component.html',
})
export class MahasiswaCardComponent {
  // TODO: tambahkan import { Input } from '@angular/core' di atas
  // TODO: deklarasikan @Input() nama!: string;
  // TODO: deklarasikan @Input() nim!: string;
  @Input () nama! : string;
  @Input () nim! : string;
}
