export interface UserInfo  {
    full_name: string,
    email: string,
    username: string,
    password:string
}

export interface User {
    _id: string,
    username : string
    fullName: string
    photo?: string | null,
    followers: []
}