import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
import { MailingService } from '../services/mailing.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  subs = new SubSink();
  formGroup: FormGroup;
  token: string | undefined;

  constructor(
    private fb: FormBuilder,
    private mailing: MailingService,
    private snackbar: MatSnackBar
  ) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
      captcha: ['', Validators.required]
    });
    this.token = undefined;
  }

  ngOnInit(): void {
    this.subs.sink = this.mailing.emailSuccess.subscribe(() => {
      this.openSnackBar('Email sent successfully!');
    });

    this.subs.sink = this.mailing.emailFailure.subscribe(() => {
      this.openSnackBar('Error sending email');
    });
  }

  openSnackBar(message: string) {
    this.snackbar.open(message, 'OK');
  }

  resolved(captchaResponse: string) {
    this.formGroup.patchValue({
      captcha: captchaResponse
    });
  }

  sendEmail() {
    const values = this.formGroup.value;
    if(
      values.name !== '' &&
      values.email !== '' &&
      values.message !== '' &&
      values.captcha !== ''
    ) {
      this.mailing.sendEmail(
        values.name,
        values.email,
        values.message,
      );
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
