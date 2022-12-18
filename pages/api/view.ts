import simpleQuery from './no_brain_db' // .ts

export async function getSubData( id: number ){
  return await simpleQuery(
    "SELECT submissions.id, submissions.sdate, submissions.problem, users.name AS uname, submissions.verdict, submissions.points, submissions.time, submissions.memory, submissions.tests, problems.name AS pbname, problems.title AS pbtitle FROM submissions INNER JOIN users ON submissions.user_id=users.id AND submissions.id=$1 INNER JOIN problems ON submissions.problem=problems.name",
    [id]
  )
}