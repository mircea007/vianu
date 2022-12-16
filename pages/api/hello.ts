// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from 'pg'
 
const client = new Client({
  host: process.env.PGHOST,
  port: +(process.env.PGPORT as string),
  password: process.env.PGPASSWORD,
  user: process.env.PGUSER,
})

export default function handler( req: NextApiRequest, res: NextApiResponse ){

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
