import { Pacient } from './pacient';
import { Medic } from './medic';

export class Appointment {
    id: number;
    start: String;
    end: String;
    pacientId: String;
    medicId: String;
    pacient: Pacient;
    medic: Medic;
    title: String;
}
