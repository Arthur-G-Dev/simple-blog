import postgres from "../../postgres";

const TABLE_NAME = 'categories'

export const getCategories = async () => {
  const pg = postgres()
  const query = `SELECT * FROM ${TABLE_NAME}`
  const { rows } = await pg.query(query)

  return rows
}
