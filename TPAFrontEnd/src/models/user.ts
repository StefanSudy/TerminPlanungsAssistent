export class User
{
    id: number;
    eMail: string;
    active: boolean;
    token: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
   }
}
