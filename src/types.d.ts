import { Request } from 'express'

interface UserRequest extends Request {
  user?: { _id: string }
}
