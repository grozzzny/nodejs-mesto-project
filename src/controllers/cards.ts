import { RequestHandler } from 'express'
import Card from '../models/card'
import type { UserRequest } from '../types'
import NotFoundError from '../errors/not-found-error'
import { sendResponse } from '../helper'

export const createCard: RequestHandler = (req: UserRequest, res, next) => {
  const { name, link } = req.body

  Card.create({ name, link, owner: req.user?._id })
    .then((card) => res.status(201).send(card))
    .catch(next)
}

export const getCards: RequestHandler = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next)
}

export const deleteCards: RequestHandler = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then(() => sendResponse(res, 'Успешно удалено'))
    .catch(next)
}

export const addLike: RequestHandler = (req: UserRequest, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user?._id } }, { new: true })
    .then((card) => {
      if (!card) throw new NotFoundError('Нет карточки с таким id')
      sendResponse(res, 'Лайк добавлен')
    })
    .catch(next)
}

export const deleteLike: RequestHandler = (req: UserRequest, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user?._id } }, { new: true })
    .then((card) => {
      if (!card) throw new NotFoundError('Нет карточки с таким id')
      sendResponse(res, 'Лайк удален')
    })
    .catch(next)
}
