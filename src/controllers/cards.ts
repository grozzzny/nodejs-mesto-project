import { RequestHandler } from 'express'
import Card from '../models/card'
import type { AuthRequest } from '../types'
import NotFoundError from '../errors/not-found-error'
import { sendResponse } from '../helper'
import ForbiddenError from '../errors/forbidden-error'

export const createCard: RequestHandler = (req: AuthRequest, res, next) => {
  const { name, link } = req.body

  Card.create({ name, link, owner: req.user?._id })
    .then((card) => res.send(card))
    .catch(next)
}

export const getCards: RequestHandler = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next)
}

export const deleteCards: RequestHandler = (req: AuthRequest, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Карточка не найдена')
      if (card.owner.toString() !== req.user?._id) throw new ForbiddenError('Нет прав на удаление')
      Card.findByIdAndDelete(req.params.cardId)
        .then(() => sendResponse(res, 'Успешно удалено'))
        .catch(next)
    })
    .catch(next)
}

export const addLike: RequestHandler = (req: AuthRequest, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user?._id } }, { new: true })
    .then((card) => {
      if (!card) throw new NotFoundError('Нет карточки с таким id')
      sendResponse(res, 'Лайк добавлен')
    })
    .catch(next)
}

export const deleteLike: RequestHandler = (req: AuthRequest, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user?._id } }, { new: true })
    .then((card) => {
      if (!card) throw new NotFoundError('Нет карточки с таким id')
      sendResponse(res, 'Лайк удален')
    })
    .catch(next)
}
