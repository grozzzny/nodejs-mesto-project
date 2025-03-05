import mongoose, { Document, Model } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import UnauthorizedError from '../errors/unauthorized-error'
import { PatternLink } from '../constants'

export interface IUser extends Document {
  name: string
  about: string
  avatar: string
  email: string
  password: string
}

interface IUserModel extends Model<IUser> {
  /* eslint-disable no-unused-vars */
  findUserByCredentials(email: string, password: string): Promise<IUser>
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто'
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь'
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value: string) => PatternLink.test(value),
      message: 'Неправильный формат URL для аватара'
    }
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Неправильный формат почты'
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  }
})

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email })
    .select('+password')
    .then((user: IUser) => {
      if (!user) return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'))
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) return Promise.reject(new UnauthorizedError('Что-то не так с почтой или паролем'))
        return user
      })
    })
})

export default mongoose.model<IUser, IUserModel>('user', userSchema)
