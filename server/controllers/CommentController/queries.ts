import postgres from "../../postgres";
import {serializeForInsert} from "../../utils";

const TABLE_NAME = 'comments'

export const creatComment = async (data: { [key: string]: any }) => {
  const pg = postgres()
  const { insertProps, insertValues, parametrizedString } = serializeForInsert(data)
  const query = `INSERT INTO ${TABLE_NAME}(${insertProps}) VALUES(${parametrizedString}) RETURNING *`
  const { rows } = await pg.query(query, insertValues)
  return rows[0]
}

export const getComments = async (id: number) => {
  const pg = postgres()
  const query = `
        SELECT * FROM ${TABLE_NAME} WHERE article_id = $1 ORDER BY created_at DESC LIMIT 5 
       `
  const {rows} = await pg.query(query, [id])
  return rows
}
