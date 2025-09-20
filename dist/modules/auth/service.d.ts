import { SignUpInput, LoginInput, AuthResponse } from '../../shared/schemas.js';
export declare class AuthService {
    private static readonly SALT_ROUNDS;
    private static storeRefreshToken;
    private static revokeRefreshToken;
    private static isRefreshTokenValid;
    static signup(data: SignUpInput): Promise<AuthResponse>;
    static login(data: LoginInput): Promise<AuthResponse>;
    static refreshAccessToken(userId: string): Promise<{
        accessToken: string;
    }>;
    static refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    static getUserById(userId: string): Promise<{
        _id: any;
        email: string;
        name: string;
        createdAt: string;
        updatedAt: string;
    }>;
    static logout(refreshToken: string): Promise<void>;
    static logoutAllSessions(userId: string): Promise<void>;
}
//# sourceMappingURL=service.d.ts.map