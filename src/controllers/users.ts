import { RequestHandler } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import type { AuthRequest } from '../types'
import NotFoundError from '../errors/not-found-error'
import ForbiddenError from '../errors/forbidden-error'

export const createUser: RequestHandler = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body

  bcrypt
    .hash(password, 10)
    .then((hash: string) => User.create({ name, about, avatar, email, password: hash }).then((user) => res.send(user)))
    .catch(next)
}

export const getUsers: RequestHandler = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next)
}

export const updateUser: RequestHandler = (req: AuthRequest, res, next) => {
  const { name, about } = req.body

  User.findById(req.user?._id)
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь не найден')
      if (user._id?.toString() !== req.user?._id) throw new ForbiddenError('Нет прав')
      User.findByIdAndUpdate(req.user?._id, { name, about }, { new: true })
        .then((updatedUser) => res.send({ user: updatedUser }))
        .catch(next)
    })
    .catch(next)
}

export const updateAvatar: RequestHandler = (req: AuthRequest, res, next) => {
  const { avatar } = req.body

  User.findById(req.user?._id)
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь не найден')
      if (user._id?.toString() !== req.user?._id) throw new ForbiddenError('Нет прав')
      User.findByIdAndUpdate(req.user?._id, { avatar }, { new: true })
        .then((updatedUser) => res.send({ user: updatedUser }))
        .catch(next)
    })
    .catch(next)
}

export const getUser: RequestHandler = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) throw new NotFoundError('Нет пользователя с таким id')
      res.send(user)
    })
    .catch(next)
}

export const getMe: RequestHandler = (req: AuthRequest, res, next) => {
  User.findById(req.user?._id)
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь не найден')
      res.send(user)
    })
    .catch(next)
}

export const login: RequestHandler = (req, res, next) => {
  const { email, password } = req.body

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, String(process.env.SECRET), {
          expiresIn: '7d'
        })
      })
    })
    .catch(next)
}
