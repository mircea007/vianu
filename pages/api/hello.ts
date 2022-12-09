// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const { Client } = require('pg')
 
const client = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
  user: process.env.PGUSER,
})

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  client.connect().then( _ => {
    client.query( "SELECT * FROM users WHERE id=1", (qerr, qres) => {
      if( qerr ){
        res.status( 500 ).send( 'Database error' )
        throw qerr
      }

      client.end(); // close database connection

      res.status( 200 ).json( qres.rows )
    });

  }).catch( err => { // connect error
    console.log( err.stack )
    res.status( 500 )
  })
}
