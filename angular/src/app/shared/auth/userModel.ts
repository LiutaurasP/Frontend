export class UserModel {
    _id: number;
    username: string;
    password: string;
    token: string;
    status: string;
    createdDate: Date;
    isValidated: boolean;
};