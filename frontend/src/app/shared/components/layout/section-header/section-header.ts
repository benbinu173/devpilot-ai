import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [],
  templateUrl: './section-header.html',
  styleUrl: './section-header.css'
})
export class SectionHeader {

  title = input('');

  subtitle = input('');

}