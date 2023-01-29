//this will moved to store in the future

import jwt_decode from 'jwt-decode';
import { authHost, host } from '.';
import { setToken } from '../services/tokenService';

interface IUser {
    email: string;
    password: string;
}

export const register = async (user: IUser) : Promise<any> => {
    const {data} = await host.post("user/register", user);
    setToken(data.token);
    return jwt_decode(data.token); // terrible 
}

export const login = async (user: IUser): Promise<any> => {
    const {data} = await host.post("user/login", user);
    setToken(data.token);
    return jwt_decode(data.token);
}

export const auth = async () : Promise<any> => {   
    const {data} = await authHost.get("user/auth");
    setToken(data.token);
    return jwt_decode(data.token);
}