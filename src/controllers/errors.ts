import { ErrorRequestHandler } from 'express'
import { ErrorStatus } from '../constants'

/* eslint-disable no-unused-vars */
export const handleError: ErrorRequestHandler = (err, req, res, next) => {
  const { statusCode = ErrorStatus.INTERNAL_SERVER_ERROR, message } = err

  if (statusCode === ErrorStatus.INTERNAL_SERVER_ERROR) console.error('ERROR', message)

  if (err.code === 11000 && err?.keyPattern?.email) {
    res.status(ErrorStatus.CONFLICT).send({ message: 'Пользователь с таким email уже существует' })
    return
  }

  if (err.name === 'ValidationError') {
    res.status(ErrorStatus.BAD_REQUEST).send({
      message
    })
    return
  }

  res.status(statusCode).send({
    message: statusCode === ErrorStatus.INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : message
  })
}
