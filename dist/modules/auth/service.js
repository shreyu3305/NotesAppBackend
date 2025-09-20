import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import mongoose from 'mongoose';
import { User } from '../users/model.js';
import { RefreshToken } from './refreshTokenModel.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from './tokens.js';
export class AuthService {
    static SALT_ROUNDS = 12;
    static async storeRefreshToken(userId, refreshToken) {
        const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        await RefreshToken.create({
            tokenHash,
            userId: new mongoose.Types.ObjectId(userId),
            expiresAt
        });
    }
    static async revokeRefreshToken(refreshToken) {
        const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
        await RefreshToken.findOneAndDelete({ tokenHash });
    }
    static async isRefreshTokenValid(refreshToken) {
        const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
        const token = await RefreshToken.findOne({ tokenHash });
        return !!token;
    }
    static async signup(data) {
        // Check if user already exists
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        // Hash password
        const passwordHash = await bcrypt.hash(data.password, this.SALT_ROUNDS);
        // Create user
        const user = new User({
            email: data.email,
            passwordHash,
            name: data.name
        });
        await user.save();
        // Generate tokens
        const accessToken = signAccessToken(user);
        const refreshToken = signRefreshToken(user);
        // Store refresh token in database
        await this.storeRefreshToken(user._id.toString(), refreshToken);
        return {
            user: {
                _id: user._id.toString(),
                email: user.email,
                name: user.name,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString()
            },
            accessToken,
            refreshToken
        };
    }
    static async login(data) {
        // Find user by email
        const user = await User.findOne({ email: data.email });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        // Verify password
        const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        // Generate tokens
        const accessToken = signAccessToken(user);
        const refreshToken = signRefreshToken(user);
        // Store refresh token in database
        await this.storeRefreshToken(user._id.toString(), refreshToken);
        return {
            user: {
                _id: user._id.toString(),
                email: user.email,
                name: user.name,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString()
            },
            accessToken,
            refreshToken
        };
    }
    static async refreshAccessToken(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const accessToken = signAccessToken(user);
        return { accessToken };
    }
    static async refreshTokens(refreshToken) {
        // Verify refresh token JWT
        const payload = verifyRefreshToken(refreshToken);
        // Check if refresh token exists in database (not revoked)
        const isValid = await this.isRefreshTokenValid(refreshToken);
        if (!isValid) {
            throw new Error('Refresh token has been revoked');
        }
        // Get user
        const user = await User.findById(payload.userId);
        if (!user) {
            throw new Error('User not found');
        }
        // Revoke old refresh token
        await this.revokeRefreshToken(refreshToken);
        // Generate new tokens (rotation)
        const newAccessToken = signAccessToken(user);
        const newRefreshToken = signRefreshToken(user);
        // Store new refresh token
        await this.storeRefreshToken(user._id.toString(), newRefreshToken);
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }
    static async getUserById(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return {
            _id: user._id.toString(),
            email: user.email,
            name: user.name,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString()
        };
    }
    static async logout(refreshToken) {
        if (refreshToken) {
            await this.revokeRefreshToken(refreshToken);
        }
    }
    static async logoutAllSessions(userId) {
        await RefreshToken.deleteMany({ userId: new mongoose.Types.ObjectId(userId) });
    }
}
//# sourceMappingURL=service.js.map