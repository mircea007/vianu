// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from 'pg'

const pb_query = "SELECT problems.title, problems.authors, problems.source, problems.solves, users.name AS contrib, problems.statement FROM problems LEFT JOIN users ON problems.contributor=users.id AND problems.name=$1"

export async function getPbData( pbname: string ){
  const client = new Client({
    host: process.env.PGHOST,
    port: +(process.env.PGPORT as string),
    password: process.env.PGPASSWORD,
    user: process.env.PGUSER,
  })

  try{
    await client.connect()

    const qres = await client.query( pb_query, [pbname] )

    client.end()

    return qres.rows
  }catch( err ){
    client.end()
    throw err // error handling is not this function's job
  }
}

/*
export default async function handler( req: NextApiRequest, res: NextApiResponse ){
  try{
    const data = await getPbPage( (+(req.query.page as string) || 1) - 1 )

    res.status( 200 ).json( data );
  }catch( err ){ // connect error
    console.log( err )
    res.status( 500 ).json( { error: 'Internal Server error' } )
  }
}
*/