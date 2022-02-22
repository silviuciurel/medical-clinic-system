import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { Appointment } from '../../../models/appointment';
import { AppointmentService } from '../../../services/appointment.service';
import { DataShareService } from '../../../services/data-share.service';
import { Router, ActivatedRoute, RouterLink, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  events: any[];
  options: any;
  display: boolean;
  medicUsername: String;

  constructor(private appointmentService: AppointmentService,
              private shareService: DataShareService,
              private token: TokenStorageService) { }

  ngOnInit() {
    this.medicUsername = this.token.getUsername();
    this.getAppointmentsMedic(this.medicUsername);

    this.options = {

      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      //defaultDate: '2017-02-01',
      weekends: false,
      defaultView: "timeGridWeek",
      height: 'parent',
      contentHeight: 'auto',
      timeZone: 'local',
      //allDaySlot: false,
      //editable: true,
      selectable: true,
      minTime: "08:00:00",
      maxTime: "21:00:00",
      header: {
        left: 'prev,next,today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }
    }
  }

  getAppointmentsMedic(username){
    this.appointmentService.getAppointmentsMedicUsername(username).subscribe(
      data => {
        this.events = <any[]> data,
        console.log(this.events)
      },
      err => console.error(err)
    )
  }

}
