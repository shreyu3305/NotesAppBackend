import { IUser } from '../users/model.js';
export interface TokenPayload {
    userId: string;
    email: string;
}
export declare const signAccessToken: (user: IUser) => string;
export declare const signRefreshToken: (user: IUser) => string;
export declare const verifyAccessToken: (token: string) => TokenPayload;
export declare const verifyRefreshToken: (token: string) => TokenPayload;
//# sourceMappingURL=tokens.d.ts.map