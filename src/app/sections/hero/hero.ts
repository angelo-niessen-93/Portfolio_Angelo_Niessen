import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class Hero {
}
