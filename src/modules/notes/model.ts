import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
  title: string;
  body: string;
  tags: string[];
  ownerId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120
  },
  body: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: function(tags: string[]) {
        return tags.length <= 10;
      },
      message: 'Maximum 10 tags allowed'
    }
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  }
}, {
  timestamps: true
});

// Compound index for efficient listing by owner and sorting by updatedAt
NoteSchema.index({ ownerId: 1, updatedAt: -1 });

// Text index for search functionality
NoteSchema.index({ title: 'text', body: 'text' });

export const Note = mongoose.model<INote>('Note', NoteSchema);
