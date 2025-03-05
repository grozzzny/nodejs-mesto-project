import { Request } from 'express'

interface AuthRequest extends Request {
  user?: Payload
}

interface Payload {
  _id: string
}
