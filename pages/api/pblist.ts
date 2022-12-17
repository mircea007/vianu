// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from 'pg'

const page_query = "SELECT * FROM problems ORDER BY id LIMIT $1 OFFSET $2"

const PAGE_SIZE = 25;

export async function getPbPage( pagenum: number ){
  const client = new Client({
    host: process.env.PGHOST,
    port: +(process.env.PGPORT as string),
    password: process.env.PGPASSWORD,
    user: process.env.PGUSER,
  })

  try{
    await client.connect()

    const qres = await client.query( page_query, [PAGE_SIZE, PAGE_SIZE * pagenum] )

    client.end()

    return qres.rows
  }catch( err ){
    client.end()
    throw err // error handling is not this function's job
  }
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ){
  try{
    const data = await getPbPage( (+(req.query.page as string) || 1) - 1 )

    res.status( 200 ).json( data );
  }catch( err ){ // connect error
    console.log( err )
    res.status( 500 ).json( { error: 'Internal Server error' } )
  }
}
