import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TODO_JPA_API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AppointmentBookingService {

  constructor(
    private http: HttpClient
  ) { }

  getAllUsernames() {
    return this.http.get<string[]>(`${TODO_JPA_API_URL}/appointment`);
  }

  bookAppointment(username: any, todo: any) {
    return this.http.post<boolean>(`${TODO_JPA_API_URL}/users/${username}/bookAppointment`, todo);
  }


}
