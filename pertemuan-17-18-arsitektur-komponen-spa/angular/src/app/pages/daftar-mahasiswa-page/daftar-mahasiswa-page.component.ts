import { Component } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MahasiswaListComponent } from '../../components/mahasiswa-list/mahasiswa-list.component';
import { Mahasiswa } from '../../mahasiswa.model';

const DATA_MAHASISWA: Mahasiswa[] = [
  { id: 1, nama: 'Andi', nim: '2024001' },
  { id: 2, nama: 'Budi', nim: '2024002' },
  { id: 3, nama: 'Citra', nim: '2024003' },
];

@Component({
  selector: 'app-daftar-mahasiswa-page',
  standalone: true,
  imports: [SearchBarComponent, MahasiswaListComponent],
  templateUrl: './daftar-mahasiswa-page.component.html',
})
export class DaftarMahasiswaPageComponent {
  keyword = '';

  // Memfilter data mahasiswa berdasarkan nama
  get mahasiswaTersaring(): Mahasiswa[] {
    return DATA_MAHASISWA.filter((m) =>
      m.nama.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }

  onSearch(keyword: string) {
    this.keyword = keyword;
  }
}