interface Error {
  status?: number;
  other?: {
    [key: string]: any
  }
  data?: {
    [key: string]: any
  }
}

const generateError = (text:string, status:number, props = {}) => {
  const error = new Error(text) as Error
  error.status = status
  error.other = { ...props }

  return error
}

export const noTokenProvided = generateError('No Token Provided', 401)

export const failedAuthorizeToken = generateError('Failed Authorize Token', 403)

export const userNotFound = generateError('User not found', 404)

export const invalidCredentials = generateError('Email and/or password invalid', 401)

export const userExists = generateError('User with given email already registered', 401)
