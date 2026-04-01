import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HeaderComponent } from '../../layout/header/header';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [HeaderComponent, TranslatePipe],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class Hero {
}
