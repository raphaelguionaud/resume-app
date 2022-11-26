import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailingService {
  backendUrl = 'https://resume-backend-rg.herokuapp.com/sendmail';
  emailSuccess = new EventEmitter();
  emailFailure = new EventEmitter();

  constructor(
    private http: HttpClient
  ) {}

  sendEmail(
    name: string,
    email: string,
    message: string
  ) {
    console.log('sending email');
    const emailSub = this.http.post(this.backendUrl, {
      name: name,
      email: email,
      message: message
    }).subscribe({
      next: res => {
        this.emailSuccess.emit();
      },
      error: err => {
        this.emailFailure.emit();
      }
    });

  }
}
