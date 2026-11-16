import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mahasiswa } from '../../mahasiswa.model';
import { MahasiswaCardComponent } from '../mahasiswa-card/mahasiswa-card.component';

@Component({
  selector: 'app-mahasiswa-list',
  standalone: true,
  imports: [
    CommonModule,
    MahasiswaCardComponent
  ],
  templateUrl: './mahasiswa-list.component.html',
})
export class MahasiswaListComponent {
  @Input() mahasiswa: Mahasiswa[] = [];
}