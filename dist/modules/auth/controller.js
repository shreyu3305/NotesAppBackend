import { AuthService } from './service.js';
import { SignUpSchema, LoginSchema } from '../../shared/schemas.js';
export class AuthController {
    static async signup(req, res) {
        try {
            // Validate request body
            const validatedData = SignUpSchema.parse(req.body);
            // Create user and get tokens
            const result = await AuthService.signup(validatedData);
            // Set refresh token as httpOnly cookie
            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });
            res.status(201).json(result);
        }
        catch (error) {
            if (error.message === 'User with this email already exists') {
                res.status(409).json({
                    error: {
                        code: 'USER_EXISTS',
                        message: 'User with this email already exists'
                    }
                });
            }
            else {
                res.status(400).json({
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: error.message
                    }
                });
            }
        }
    }
    static async login(req, res) {
        try {
            // Validate request body
            const validatedData = LoginSchema.parse(req.body);
            // Authenticate user and get tokens
            const result = await AuthService.login(validatedData);
            // Set refresh token as httpOnly cookie
            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });
            res.json(result);
        }
        catch (error) {
            if (error.message === 'Invalid email or password') {
                res.status(401).json({
                    error: {
                        code: 'AUTH_INVALID',
                        message: 'Invalid email or password'
                    }
                });
            }
            else {
                res.status(400).json({
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: error.message
                    }
                });
            }
        }
    }
    static async refresh(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                res.status(401).json({
                    error: {
                        code: 'AUTH_EXPIRED',
                        message: 'No refresh token provided'
                    }
                });
                return;
            }
            // Verify refresh token and rotate tokens
            const result = await AuthService.refreshTokens(refreshToken);
            // Set new refresh token as httpOnly cookie (rotation)
            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });
            res.json({ accessToken: result.accessToken });
        }
        catch (error) {
            res.status(401).json({
                error: {
                    code: 'AUTH_EXPIRED',
                    message: 'Invalid refresh token'
                }
            });
        }
    }
    static async logout(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            // Revoke refresh token from database
            if (refreshToken) {
                await AuthService.logout(refreshToken);
            }
            // Clear the refresh token cookie
            res.clearCookie('refreshToken');
            res.status(204).send();
        }
        catch (error) {
            // Even if revocation fails, clear the cookie
            res.clearCookie('refreshToken');
            res.status(204).send();
        }
    }
    static async me(req, res) {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({
                    error: {
                        code: 'AUTH_EXPIRED',
                        message: 'No user ID in token'
                    }
                });
                return;
            }
            const user = await AuthService.getUserById(userId);
            res.json({ user });
        }
        catch (error) {
            res.status(401).json({
                error: {
                    code: 'AUTH_EXPIRED',
                    message: 'User not found'
                }
            });
        }
    }
}
//# sourceMappingURL=controller.js.map