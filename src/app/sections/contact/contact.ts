import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, TranslatePipe],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly translate = inject(TranslateService);

  isSubmitting = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

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

    this.isSubmitting = true;
    this.successMessage = null;
    this.errorMessage = null;

    const { name, email, message } = this.contactForm.getRawValue();
    const payload = {
      name: name ?? '',
      email: email ?? '',
      message: message ?? '',
    };

    this.http.post('/send-email.php', payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = this.translate.instant('CONTACT.SUCCESS');
        this.contactForm.reset();

        setTimeout(() => {
          this.successMessage = null;
        }, 5000);
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting = false;
        this.errorMessage = this.getErrorMessage(error);

        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
      },
    });
  }

  isFieldInvalid(field: 'name' | 'email' | 'message'): boolean {
    const control = this.contactForm.get(field);
    return !!control && this.hasInteracted(control) && control.invalid;
  }

  isFieldValid(field: 'name' | 'email' | 'message'): boolean {
    const control = this.contactForm.get(field);
    return !!control && this.hasInteracted(control) && control.valid;
  }

  getFieldFeedbackKey(field: 'name' | 'email' | 'message'): string | null {
    const control = this.contactForm.get(field);
    const base = this.getFieldFeedbackBase(field);

    if (!control || !this.hasInteracted(control)) {
      return null;
    }

    if (control.hasError('required')) {
      return `${base}.REQUIRED`;
    }

    if (control.hasError('email')) {
      return `${base}.INVALID`;
    }

    if (control.hasError('minlength')) {
      return `${base}.MIN_LENGTH`;
    }

    return `${base}.VALID`;
  }

  isPrivacyInvalid(): boolean {
    const control = this.contactForm.get('privacy');
    return !!control && this.hasInteracted(control) && control.invalid;
  }

  isPrivacyValid(): boolean {
    const control = this.contactForm.get('privacy');
    return !!control && this.hasInteracted(control) && control.valid;
  }

  getPrivacyFeedbackKey(): string | null {
    const control = this.contactForm.get('privacy');
    const base = 'CONTACT.FORM.FEEDBACK.PRIVACY';

    if (!control || !this.hasInteracted(control)) {
      return null;
    }

    if (control.hasError('required') || control.hasError('requiredTrue')) {
      return `${base}.REQUIRED`;
    }

    return `${base}.VALID`;
  }

  private hasInteracted(control: AbstractControl): boolean {
    return control.touched || control.dirty;
  }

  private getFieldFeedbackBase(field: 'name' | 'email' | 'message'): string {
    switch (field) {
      case 'name':
        return 'CONTACT.FORM.FEEDBACK.NAME';
      case 'email':
        return 'CONTACT.FORM.FEEDBACK.EMAIL';
      case 'message':
      default:
        return 'CONTACT.FORM.FEEDBACK.MESSAGE';
    }
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return this.translate.instant('CONTACT.ERROR.SERVER_UNREACHABLE');
    }

    const backendError = typeof error.error?.error === 'string' ? error.error.error : null;
    if (backendError) {
      return backendError;
    }

    if (error.status === 404) {
      return this.translate.instant('CONTACT.ERROR.SCRIPT_NOT_FOUND');
    }

    if (error.status >= 500) {
      return this.translate.instant('CONTACT.ERROR.SERVER');
    }

    return this.translate.instant('CONTACT.ERROR.GENERIC');
  }
}
