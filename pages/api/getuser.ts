import simpleQuery from './no_brain_db' // .ts

export async function getUserData( uname: string ){
  return await simpleQuery(
    "SELECT name, rdate FROM users WHERE name=$1",
    [uname]
  )
}
