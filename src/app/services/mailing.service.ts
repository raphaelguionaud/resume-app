import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Headers', 'Content-Type')
    .append('Access-Control-Allow-Origin', '*');
    
    const emailSub = this.http.post(
      this.backendUrl, 
      {
        name: name,
        email: email,
        message: message
      }, 
      {
        headers
      }
    ).subscribe({
      next: (res: any) => {
        if(res?.message === 'ok') {
          this.emailSuccess.emit();
        } else {
          this.emailFailure.emit();
        }
      },
      error: err => {
        this.emailFailure.emit();
      }
    });

  }
}
