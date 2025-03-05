export enum ErrorStatus {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  CONFLICT = 409,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403
}

export const PatternLink = /^(https?:\/\/)(w{3}\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?(#)?$/
