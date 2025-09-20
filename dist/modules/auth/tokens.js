import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
export const signAccessToken = (user) => {
    const payload = {
        userId: user._id.toString(),
        email: user.email
    };
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
        expiresIn: env.ACCESS_TTL,
        issuer: 'notesapp',
        audience: 'notesapp-client'
    });
};
export const signRefreshToken = (user) => {
    const payload = {
        userId: user._id.toString(),
        email: user.email
    };
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
        expiresIn: env.REFRESH_TTL,
        issuer: 'notesapp',
        audience: 'notesapp-client'
    });
};
export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, env.JWT_ACCESS_SECRET, {
            issuer: 'notesapp',
            audience: 'notesapp-client'
        });
    }
    catch (error) {
        throw new Error('Invalid access token');
    }
};
export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, env.JWT_REFRESH_SECRET, {
            issuer: 'notesapp',
            audience: 'notesapp-client'
        });
    }
    catch (error) {
        throw new Error('Invalid refresh token');
    }
};
//# sourceMappingURL=tokens.js.map