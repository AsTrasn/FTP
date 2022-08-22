export type Roles = 'ADMIN' | 'USER'

export interface User {
    username: string,
    password: string,
}

export interface UserResponse {
    id: number,
    username: string,
    email: string,
    roles: string[],
    accessToken: string,
    tokenType: string,
}

export interface RoleResponse{
    id: number,
    username: string,
    role: Roles,
}