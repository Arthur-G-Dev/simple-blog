import postgres from '../../postgres'
import {serializeForInsert, serializeForUpdate} from "../../utils";

const TABLE_NAME = 'users'

export const createUser = async (data: { [key: string]: any }) => {
  const pg = postgres()
  const { insertProps, insertValues, parametrizedString } = serializeForInsert(data)
  const query = `INSERT INTO ${TABLE_NAME}(${insertProps}) VALUES(${parametrizedString}) RETURNING *`
  const { rows } = await pg.query(query, insertValues)
  return rows[0]
}

export const updateUser = async (data: { [key: string]: any }, id: number) => {
  const pg = postgres()
  const { updateProps, updateValues, parametrizedString } = serializeForUpdate(data)
  const query = `UPDATE ${TABLE_NAME} SET ${parametrizedString} WHERE id=$${updateProps.length + 1} RETURNING *`
  updateValues.push(id)
  const { rows } = await pg.query(query, updateValues)
  return rows[0]
}

export const getUser = async (email: string) => {
  const pg = postgres()
  const query = `SELECT * FROM ${TABLE_NAME} WHERE email = $1`
  const {rows} = await pg.query(query, [email])
  return rows[0]
}
