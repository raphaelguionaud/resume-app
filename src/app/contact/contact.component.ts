import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MailingService } from '../services/mailing.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  formGroup: FormGroup;
  token: string | undefined;

  constructor(
    private fb: FormBuilder,
    private mailing: MailingService,
    private http: HttpClient
  ) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
      captcha: ['', Validators.required]
    });
    this.token = undefined;
  }

  ngOnInit(): void {}

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
}
