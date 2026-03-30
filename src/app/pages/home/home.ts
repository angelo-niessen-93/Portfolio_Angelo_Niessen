import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer';
import { About } from '../../sections/about/about';
import { Contact } from '../../sections/contact/contact';
import { Hero } from '../../sections/hero/hero';
import { Projects } from '../../sections/projects/projects';
import { Skills } from '../../sections/skills/skills';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, About, Skills, Projects, Contact, FooterComponent],
  templateUrl: './home.html',
})
export class Home {}
