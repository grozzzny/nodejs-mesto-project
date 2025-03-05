import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { ErrorStatus } from '../constants'
import type { AuthRequest, Payload } from '../types'
import { sendResponse } from '../helper'

export const auth: RequestHandler = (req: AuthRequest, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    sendResponse(res, 'Необходима авторизация', ErrorStatus.UNAUTHORIZED)
    return
  }

  try {
    req.user = jwt.verify(token, String(process.env.SECRET)) as Payload
    next()
    /* eslint-disable no-unused-vars */
  } catch (err) {
    sendResponse(res, 'Неверный токен', ErrorStatus.UNAUTHORIZED)
  }
}
