import simpleQuery from './no_brain_db' // .ts

export async function getPbData( pbname: string ){
  return await simpleQuery(
    "SELECT problems.id, problems.name, problems.title, problems.authors, problems.source, problems.solves, users.name AS contrib, problems.statement FROM problems INNER JOIN users ON problems.contributor=users.id AND problems.name=$1",
    [pbname]
  )
}
