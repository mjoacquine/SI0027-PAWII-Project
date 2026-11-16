import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {

  @Input() keyword = '';

  @Output() search = new EventEmitter<string>();

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    // Mengirim nilai input ke komponen induk
    this.search.emit(value);
  }
}