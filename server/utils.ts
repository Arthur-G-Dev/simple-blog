import {compareSync} from "bcryptjs";
// @ts-ignore
import * as jwt from 'jsonwebtoken'

export const serializeForInsert = (data: any) => {
  const insertProps = Object.keys(data).join(', ')
  const insertValues = Object.values(data)
  const parametrizedString = insertValues.map((_, key) => `$${key + 1}`).join(',')
  return {
    insertProps,
    insertValues,
    parametrizedString
  }
}

export const serializeForUpdate = (data: any) => {
  const updateProps = Object.keys(data)
  const updateValues = Object.values(data)
  const parametrizedString = updateProps.map((val, key) => `${val} = $${key + 1}`).join(', ')
  return {
    updateProps,
    updateValues,
    parametrizedString
  }
}

export const validatePasswordMatch = (password:string, encryptedPassword:string) => compareSync(password, encryptedPassword)

export const sign = (data:{[key:string]:any}, expiresIn = '24h') => {
  const jwtSecret = process.env.JWT_SECRET as string
  console.log("SECRET", jwtSecret)
  return jwt.sign(data, jwtSecret, { expiresIn })
}

export const decode = (token:string) => {
  const jwtSecret = process.env.JWT_SECRET as string
  return jwt.verify(token, jwtSecret)
}

