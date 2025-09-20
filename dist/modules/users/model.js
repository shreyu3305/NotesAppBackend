import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    }
}, {
    timestamps: true
});
// Ensure indexes are created
UserSchema.index({ email: 1 });
export const User = mongoose.model('User', UserSchema);
//# sourceMappingURL=model.js.map