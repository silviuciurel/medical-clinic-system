import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Appointment } from '../../../models/appointment';
import { AppointmentService } from '../../../services/appointment.service';
import { DataShareService } from '../../../services/data-share.service';
import { Router, ActivatedRoute, RouterLink, RouterEvent } from '@angular/router';


const start = "";
const end="";

declare let window: any;

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  events: any[];
  options: any;
  pacientId: String;
  medicId: String;

  display: boolean;

  //private start: Date;
  //private end: Date;

  appointment: Appointment = {
    id: null,
    start: null,
    end: null,
    pacientId: null,
    medicId: null,
    pacient: null,
    medic: null,
    title: null
  }

  constructor(private appointmentService: AppointmentService,
              private shareService: DataShareService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.display = false;
    console.log("display "+this.display);
    this.shareService.castMessage.subscribe(message => this.pacientId = message);
    this.route.paramMap.subscribe(params => {
      this.medicId = params.get('id');
    })

    this.getAppointmentsMedic(this.medicId);

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
      },
      select: function(info){
        //alert('ai selectat '+info.startStr + 'pana la '+info.endStr);
        //this.appointment.start = info.startStr;
        //this.appointment.end = info.endStr;
        //start = info.startStr;
        //this.end = info.endStr;
        window.sessionStorage.setItem(start, info.startStr);
        window.localStorage.setItem(end, info.endStr);
        //console.log(start+" +"+ info.startStr);
        //console.log(end+" +"+ info.endStr);
      },
      eventClick: (data) => {
        
        
        //this.display = true;
        //console.log("display "+this.display);
            
        
        if (confirm("Doriți să ștergeți programarea?")){
          this.deleteAppointment(data.event.id),
          console.log(data.event.id)
        }
      }

        //location.reload();

    }
  }


  addAppointment(){
    this.appointment.start = window.sessionStorage.getItem(start);
    this.appointment.end = window.localStorage.getItem(end);
    this.appointment.pacientId = this.pacientId;
    this.appointment.medicId = this.medicId;

    this.appointmentService.createAppointment(this.appointment).subscribe(
      data => console.log(data),
      err => console.error(err)
    )
    console.log(this.appointment);

    location.reload();
  }

  getAppointmentsMedic(medicId){
    this.appointmentService.getAppointmentsMedic(medicId).subscribe(
      data => {
        this.events = <any[]> data,
        console.log(this.events)
      },
      err => console.error(err)
    )
  }

  deleteAppointment(id){
    this.appointmentService.deleteAppointment(id).subscribe();
    location.reload();
  }

}
