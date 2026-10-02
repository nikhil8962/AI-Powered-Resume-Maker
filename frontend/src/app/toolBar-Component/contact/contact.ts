import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


import { MaterialDesignModule } from '../../material-design/material-design/material-design-module';
import { Snackbar } from '../../services/snackbar';

@Component({
  selector: 'app-contact',
  imports: [MaterialDesignModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private snackbar: Snackbar) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) return;

    // No backend endpoint wired up yet — this just confirms the submission
    // client-side. Wire this to a real email/API service when you're ready.
    console.log('Contact form submitted:', this.contactForm.value);
    this.snackbar.success('Message sent! We will get back to you soon.');
    this.contactForm.reset();
  }
}