export type user={
    id:string,
    displayName:string,
    email:string,
    token:string,
    imageUrl?:string
};

export type LoginCreds={
    email:string,
    password:string
}
export type RegisterCreds={
    email:string,
    password:string,
    displayName:string,
    confirmPassword:string
}