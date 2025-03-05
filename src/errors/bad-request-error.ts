import { ErrorStatus } from '../constants'

export default class BadRequestError extends Error {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = ErrorStatus.BAD_REQUEST
    this.name = 'BadRequestError'
  }
}
