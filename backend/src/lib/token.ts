import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config';

export const generate = (payload: any, options?: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET_KEY, {
            issuer: 'lacord',
            expiresIn: '7d',
            ...options
        }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};

export const decode = (token: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET_KEY, (err, deocded) => {
            if (err) reject(err);
            resolve(deocded)
        });
    });
};