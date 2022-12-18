// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from 'pg'

export default async function simpleQuery( query: string, args: any[] ){
  const client = new Client({
    host: process.env.PGHOST,
    port: +(process.env.PGPORT as string),
    password: process.env.PGPASSWORD,
    user: process.env.PGUSER,
  })

  try{
    await client.connect()

    const qres = await client.query( query, args )

    client.end()

    return qres.rows
  }catch( err ){
    client.end()
    throw err // error handling is not this function's job
  }
}
