import * as crypto from 'crypto';

export const hash = (password: string): string => {
    return crypto.createHmac('sha256', 'lacord$key$vlaue').update(password).digest('hex');
}

export const filterUnique = (array: string[]): string[] => {
    return [...new Set(array)];
};