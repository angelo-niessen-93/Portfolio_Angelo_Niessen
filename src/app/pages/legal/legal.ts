import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FooterComponent } from '../../layout/footer/footer';
import { HeaderComponent } from '../../layout/header/header';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, TranslatePipe],
  templateUrl: './legal.html',
  styleUrls: ['./legal.scss'],
})
export class Legal {}
