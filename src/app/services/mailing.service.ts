import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailingService {

  constructor(
    private http: HttpClient
  ) {}

  sendEmail(
    name: string,
    email: string,
    message: string
  ) {
    console.log('sending email');
    // const emailSub = this.http.post('http://localhost:3000/sendmail', {
    //   name: name,
    //   email: email,
    //   message: message
    // }).subscribe(res => {
    //   console.log('res -', res);
    // });
  }
}
