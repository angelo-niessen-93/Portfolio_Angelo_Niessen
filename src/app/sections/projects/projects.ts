import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

type ProjectItem = {
  id: string;
  order: string;
  name: string;
  tech: string;
  image: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  techBadges: Array<{ icon: string; label: string }>;
};

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
  host: {
    '[class.modal-open]': 'selectedProject !== null',
  },
})
export class Projects {
  activeProjectId: string | null = null;
  selectedProjectId: string | null = null;

  readonly projects: ProjectItem[] = [
    {
      id: 'el-pollo-loco',
      order: '01',
      name: 'Moonberry Tales',
      tech: 'HTML | CSS | JavaScript',
      image: '/bilder/Moonbery%20Tales.png',
      description: 'PROJECTS.ITEMS.MOONBERRY.DESCRIPTION',
      githubUrl: 'https://github.com/angelo-niessen-93/MoonberryTales',
      liveUrl: 'https://angeloniessen.dev/MoonberryTales/',
      techBadges: [
        { icon: '/icons/JavaScript.png', label: 'JavaScript' },
        { icon: '/icons/HTML.png', label: 'HTML' },
        { icon: '/icons/HTML.png', label: 'CSS' },
      ],
    },
  ];

  setActiveProject(projectId: string): void {
    this.activeProjectId = projectId;
  }

  clearActiveProject(): void {
    this.activeProjectId = null;
  }

  openProject(projectId: string): void {
    this.selectedProjectId = projectId;
  }

  closeProject(): void {
    this.selectedProjectId = null;
  }

  get selectedProject(): ProjectItem | null {
    return this.projects.find((project) => project.id === this.selectedProjectId) ?? null;
  }
}
