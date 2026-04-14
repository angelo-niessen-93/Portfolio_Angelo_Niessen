import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

type ProjectItem = {
  id: string;
  order: string;
  name: string;
  tech: string;
  image: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
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
  previewTop = 0;

  @ViewChild('projectsPreview') private projectsPreviewRef?: ElementRef<HTMLElement>;
  @ViewChild('previewFrame') private previewFrameRef?: ElementRef<HTMLElement>;

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
        { icon: '/icons/Javascript.png', label: 'JavaScript' },
        { icon: '/icons/HTML.png', label: 'HTML' },
        { icon: '/icons/CSS.png', label: 'CSS' },
      ],
    },
    {
      id: 'pokedex',
      order: '02',
      name: 'Pokedex',
      tech: 'HTML | CSS | JavaScript | REST API',
      image: '/bilder/Pokedex.jpeg',
      description: 'PROJECTS.ITEMS.POKEDEX.DESCRIPTION',
      githubUrl: 'https://github.com/angelo-niessen-93/pokedex-test',
      liveUrl: 'https://angeloniessen.dev/pokedex/',
      techBadges: [
        { icon: '/icons/Javascript.png', label: 'JavaScript' },
        { icon: '/icons/HTML.png', label: 'HTML' },
        { icon: '/icons/CSS.png', label: 'CSS' },
      ],
    },
    {
      id: 'join',
      order: '03',
      name: 'Join',
      tech: 'In progress',
      image: '/bilder/join.png',
      description: 'PROJECTS.ITEMS.JOIN.DESCRIPTION',
      techBadges: [
        { icon: '/icons/Angular.png', label: 'Angular' },
        { icon: '/icons/TypeScript.png', label: 'TypeScript' },
        { icon: '/icons/Firebase.png', label: 'Firebase' },
        { icon: '/icons/CSS.png', label: 'CSS' },
        { icon: '/icons/HTML.png', label: 'HTML' },
      ],
    },
  ];

  setActiveProject(projectId: string, event?: MouseEvent): void {
    this.activeProjectId = projectId;

    const rowElement = event?.currentTarget;
    if (rowElement instanceof HTMLElement) {
      this.updatePreviewPosition(rowElement);
    }
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

  openNextProject(): void {
    if (!this.projects.length) {
      return;
    }

    const currentIndex = this.projects.findIndex((project) => project.id === this.selectedProjectId);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % this.projects.length;
    this.selectedProjectId = this.projects[nextIndex].id;
  }

  get selectedProject(): ProjectItem | null {
    return this.projects.find((project) => project.id === this.selectedProjectId) ?? null;
  }

  private updatePreviewPosition(rowElement: HTMLElement): void {
    const previewColumn = this.projectsPreviewRef?.nativeElement;
    const previewFrame = this.previewFrameRef?.nativeElement;

    if (!previewColumn || !previewFrame) {
      return;
    }

    const rowRect = rowElement.getBoundingClientRect();
    const columnRect = previewColumn.getBoundingClientRect();
    const previewHeight = previewFrame.offsetHeight;
    const targetTop = rowRect.top - columnRect.top + rowRect.height / 2 - previewHeight / 2;
    const maxTop = Math.max(0, previewColumn.clientHeight - previewHeight);

    this.previewTop = Math.max(0, Math.min(targetTop, maxTop));
  }
}
