import { RequestHandler } from 'express'
import User from '../models/user'
import type { UserRequest } from '../types'
import NotFoundError from '../errors/not-found-error'
import { sendResponse } from '../helper'

export const createUser: RequestHandler = (req, res, next) => {
  const { name, about, avatar } = req.body

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch(next)
}

export const getUsers: RequestHandler = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next)
}

export const updateUser: RequestHandler = (req: UserRequest, res, next) => {
  const { name, about } = req.body

  User.findByIdAndUpdate(req.user?._id, { name, about }, { new: true, runValidators: true })
    .then(() => sendResponse(res))
    .catch(next)
}

export const updateAvatar: RequestHandler = (req: UserRequest, res, next) => {
  const { avatar } = req.body

  User.findByIdAndUpdate(req.user?._id, { avatar }, { new: true, runValidators: true })
    .then(() => sendResponse(res))
    .catch(next)
}

export const getUser: RequestHandler = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) throw new NotFoundError('Нет пользователя с таким id')
      res.send({ data: user })
    })
    .catch(next)
}
