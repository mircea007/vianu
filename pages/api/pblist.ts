// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import simpleQuery from './no_brain_db' // .ts

const PAGE_SIZE = 25;

export async function getPbPage( pagenum: number ){
  return await simpleQuery(
    "SELECT name, title, authors, source, solves FROM problems ORDER BY id LIMIT $1 OFFSET $2",
    [PAGE_SIZE, PAGE_SIZE * pagenum]
  )
}
