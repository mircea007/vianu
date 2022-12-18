import simpleQuery from './no_brain_db' // .st

const PAGE_SIZE = 25;

export async function getMonitor( pb: (string | undefined) ){
  if( pb ){

  }else{
    return await simpleQuery(
      "SELECT submissions.id, submissions.problem, submissions.verdict, submissions.points, submissions.time, submissions.memory, submissions.sdate, users.name AS uname FROM submissions LEFT JOIN users ON submissions.user_id=users.id ORDER BY id DESC LIMIT $1 OFFSET $2",
      [PAGE_SIZE, 0]
    )
  }
}