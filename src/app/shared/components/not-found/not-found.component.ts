import { HomeComponent } from './../../../pages/home/home.component';
import { URLs } from './../../helper/urls';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  home=URLs.HOME;
}
