export class Appointment {
   id: number;
   entryName: string;
   entryText: string;
   dateDue: Date;
   dateCreated: Date;
   duration: Date;
   status: boolean;
   userID: number;
   constructor(values: Object = {}) {
        Object.assign(this, values);
   }
}