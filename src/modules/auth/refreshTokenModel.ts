import mongoose, { Document, Schema } from 'mongoose';

export interface IRefreshToken extends Document {
  tokenHash: string;
  userId: mongoose.Types.ObjectId;
  expiresAt: Date;
  createdAt: Date;
}

const RefreshTokenSchema = new Schema<IRefreshToken>({
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

export const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', RefreshTokenSchema);
