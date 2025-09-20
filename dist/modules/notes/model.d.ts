import mongoose, { Document } from 'mongoose';
export interface INote extends Document {
    title: string;
    body: string;
    tags: string[];
    ownerId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Note: mongoose.Model<INote, {}, {}, {}, mongoose.Document<unknown, {}, INote> & INote & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=model.d.ts.map