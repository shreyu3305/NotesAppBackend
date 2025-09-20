import mongoose, { Document } from 'mongoose';
export interface IRefreshToken extends Document {
    tokenHash: string;
    userId: mongoose.Types.ObjectId;
    expiresAt: Date;
    createdAt: Date;
}
export declare const RefreshToken: mongoose.Model<IRefreshToken, {}, {}, {}, mongoose.Document<unknown, {}, IRefreshToken> & IRefreshToken & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=refreshTokenModel.d.ts.map