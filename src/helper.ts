import { Response } from 'express'

export const sendResponse = (res: Response, message = 'Успешно', statusCode: number = 200) => {
  res.status(statusCode).send({ message })
}
