import mongoose, { Schema } from 'mongoose';
const RefreshTokenSchema = new Schema({
    tokenHash: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expireAfterSeconds: 0 } // TTL index
    }
}, {
    timestamps: true
});
// Compound index for efficient queries
RefreshTokenSchema.index({ userId: 1, tokenHash: 1 });
export const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);
//# sourceMappingURL=refreshTokenModel.js.map