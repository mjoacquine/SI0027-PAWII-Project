// Mini Project - Pertemuan 21-22: Reactive Form dengan validasi sisi klien
// TODO 1: lengkapi aturan Validators dan method onSubmit() di bawah ini.

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mahasiswa-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mahasiswa-form.component.html',
})
export class MahasiswaFormComponent {
  @Output() tambah = new EventEmitter<{ nama: string; nim: string }>();

  form = new FormGroup({
    nama: new FormControl('', Validators.required),
    nim: new FormControl('', [Validators.required, Validators.pattern(/^\d{7}$/)]),
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.tambah.emit(this.form.value as { nama: string; nim: string });
    this.form.reset({ nama: '', nim: '' });
  }
}