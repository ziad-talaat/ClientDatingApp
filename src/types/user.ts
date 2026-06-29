export type user={
    id:string,
    userName:string,
    email:string,
    token:string,
    photoUrl?:string
};

export type LoginCreds={
    email:string,
    password:string
}
export type RegisterCreds={
    email:string,
    userName:string,
    password:string,
    confirmPassword:string,
    phoneNumber:string,
    city:string,
    country:string,
    dateOfBirth:string,
    gender:string
}