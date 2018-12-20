export class Appointment {
   id: number;
   entryName: string;
   entryText: string;
   dateDue: Date;
   dateCreated: Date;
   duration: number;
   status: boolean;
   userID: number;
   constructor(values: Object = {}) {
        Object.assign(this, values);
   }
}