import type { NextApiRequest, NextApiResponse } from 'next'
//import { Client } from 'pg'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'

declare module "jsonwebtoken" {
  export interface JwtPayload {
    name: string,
    id: number
  }
}

//const user_query = "SELECT * FROM users WHERE id=$1"

export default async function handler( req: NextApiRequest, res: NextApiResponse ){
  //const client = new Client({
  //  host: process.env.PGHOST,
  //  port: process.env.PGPORT,
  //  password: process.env.PGPASSWORD,
  //  user: process.env.PGUSER,
  //})

  try{
    const user_token = jwt.verify( req.body, process.env.JWT_TOKEN as string ) as JwtPayload

    // no need for database query for now...
    // await client.connect()

    // const qres = await client.query( user_query, [user_data.id] )
    // const user_data = qres.rows[0];

    res.status( 200 ).json({ name: user_token.name })
  }catch( err ){ // connect error
    console.log( err )
    res.status( 500 ).json({ error: 'Internal Server error' })
  }
}
