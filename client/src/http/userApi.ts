import jwt_decode from 'jwt-decode';
import { authHost, host } from '.';

interface IUser {
    email: string;
    password: string;
}

export const register = async (user: IUser) : Promise<any> => {
    const {data} = await host.post("user/register", user);
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
}

export const login = async (user: IUser): Promise<any> => {
    const {data} = await host.post("user/login", user);
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
}

export const auth = async () : Promise<any> => {   
    const {data} = await authHost.get("user/auth");
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
}