import { ErrorStatus } from '../constants'

export default class NotFoundError extends Error {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = ErrorStatus.NOT_FOUND
    this.name = 'NotFoundError'
  }
}
