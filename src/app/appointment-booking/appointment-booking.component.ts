import { Component, OnInit } from '@angular/core';
import { AppointmentBookingService } from '../service/data/appointment-booking.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service ';


export class Todo {
  constructor(
    public id: number,
    public description = 'Available',
    public targetDate: Date,
    public startTime: number,
    public endTime: number,
    public username: string
  ) {

  }
}

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent implements OnInit {
  username: string
  todo: Todo = null;
  usersList: String[]
  message: string;
  constructor(
    private appointmentBookingService: AppointmentBookingService,
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  ngOnInit() {
    this.username = this.basicAuthenticationService.getAuthenticatedUser();
    this.todo = new Todo(null, '', null, null, null, null);
    this.appointmentBookingService.getAllUsernames()
      .subscribe(
        Response => {
          return this.usersList = Response;
        }
      )
  }

  calculateEndtime(startTime) {
    this.todo.startTime = Number(startTime)
    this.todo.endTime = Number(startTime) + 1;
  }

  saveAppointment() {
    this.appointmentBookingService.bookAppointment(this.username, this.todo)
      .subscribe(
        Response => {
          console.log(Response)

          if (Response === false) {
            this.message = `Appointment booking unsuccesfull , Slot is not available, hire me to quick fix . `
          } else {
            this.message = `Appointment booking succesfull.`

          }

        }
      )
  }

}
