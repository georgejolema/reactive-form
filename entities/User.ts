import Address from './Address';

export default interface User {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    address?: Address[];
}
