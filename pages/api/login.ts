// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from 'pg'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const user_query = "SELECT * FROM users WHERE name=$1"
const bcrypt_niter = 11;

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data> ){
  const client = new Client({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    password: process.env.PGPASSWORD,
    user: process.env.PGUSER,
  })

  const user_data = req.body

  try{
    await client.connect()

    const qres = await client.query( user_query, [user_data.name] )

    if( qres.rowCount == 0 ){
      client.end();
      res.status( 400 ).send( { error: 'No user with that name' } )
      return
    }

    client.end();

    bcrypt.compare( user_data.pass, qres.rows[0].phash ).then( correct => {
      if( correct == true ){
        const user_token = jwt.sign({
          name: user_data.name,
          id: qres.rows[0].id
        }, process.env.JWT_TOKEN )

        res.status( 200 ).json({ token: user_token })
      }else{
        res.status( 400 ).json({ error: 'Password incorect' })
      }
    })

  }catch( err ){ // connect error
    client.end();
    console.log( err )
    res.status( 500 ).json( { error: 'Internal Server error' } )
  }
}
