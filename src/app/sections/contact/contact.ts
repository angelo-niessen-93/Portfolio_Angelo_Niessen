import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact {
  private readonly fb = inject(FormBuilder);

  readonly contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(3)]],
    privacy: [false, [Validators.requiredTrue]],
  });

  submitContact(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const { name, email, message } = this.contactForm.getRawValue();
    const subject = encodeURIComponent(`Portfolio Anfrage von ${name ?? ''}`);
    const body = encodeURIComponent(
      `Name: ${name ?? ''}\nE-Mail: ${email ?? ''}\n\nNachricht:\n${message ?? ''}`,
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=contact@angeloniessen.dev&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener');
  }

}
