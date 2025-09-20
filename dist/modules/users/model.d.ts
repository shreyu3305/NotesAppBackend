import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    email: string;
    passwordHash: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=model.d.ts.map