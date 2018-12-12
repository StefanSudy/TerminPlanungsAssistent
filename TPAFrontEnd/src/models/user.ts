export class User
{
    id: number;
    eMail: string;
    password: string;
    active: boolean;
    constructor(values: Object = {}) {
        Object.assign(this, values);
   }
}
