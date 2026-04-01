import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FooterComponent } from '../../layout/footer/footer';
import { HeaderComponent } from '../../layout/header/header';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, TranslatePipe],
  templateUrl: './privacy.html',
  styleUrls: ['./privacy.scss'],
})
export class Privacy {}
