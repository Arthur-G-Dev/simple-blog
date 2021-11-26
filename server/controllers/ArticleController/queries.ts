import postgres from "../../postgres";
import {serializeForInsert} from "../../utils";

const TABLE_NAME = 'articles'

export const getArticles = async (search: {query: string, order: string}) => {
  const pg = postgres()
  const query = `
        SELECT "a".*, "u"."nick_name" AS "author" FROM ${TABLE_NAME} as "a"
        LEFT JOIN "users" "u" ON "u"."id" = "a"."user_id" WHERE "a"."title" LIKE LOWER('%${search.query}%') ORDER BY "a"."created_at" ${search.order}
        `
  const {rows} = await pg.query(query)
  return rows
}

export const getArticle = async (id: number) => {
  const pg = postgres()
  const query = `
        SELECT "a".*, "u"."nick_name" AS "author" FROM ${TABLE_NAME} as "a"
        LEFT JOIN "users" "u" ON "u"."id" = "a"."user_id" WHERE "a"."id" = $1
        `
  const {rows} = await pg.query(query, [id])
  return rows[0]
}

export const createArticle = async (data: { [key: string]: any }) => {
  const pg = postgres()
  const {insertProps, insertValues, parametrizedString} = serializeForInsert(data)
  const query = `INSERT INTO ${TABLE_NAME}(${insertProps}) VALUES(${parametrizedString}) RETURNING *`
  const {rows} = await pg.query(query, insertValues)
  return rows[0]
}
