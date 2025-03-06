import mongoose, { ObjectId, Schema, Document } from 'mongoose'
import { PatternLink } from '../constants'

export interface ICard extends Document {
  name: string
  link: string
  owner: ObjectId
  likes: ObjectId[]
  createdAt: Date
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => PatternLink.test(value),
      message: 'Неправильный формат URL'
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},{ versionKey: false })

export default mongoose.model<ICard>('card', cardSchema)
