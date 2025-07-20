import { Component } from '@angular/core';
import { HevoColorFontComponent } from "./shared/components/layout/hevo-color-font/hevo-color-font.component";

@Component({
  selector: 'app-root',
  imports: [HevoColorFontComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'HEVO-Angular';
}
