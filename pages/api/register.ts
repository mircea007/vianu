// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from 'pg'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const verify_query = "SELECT * FROM users WHERE name=$1"
const insert_query = "INSERT INTO users (name, phash, email, rdate) VALUES ($1, $2, $3, $4) RETURNING id"
const bcrypt_niter = 11;

export default async function handler( req: NextApiRequest, res: NextApiResponse ){
  const client = new Client({
    host: process.env.PGHOST,
    port: +(process.env.PGPORT as string),
    password: process.env.PGPASSWORD,
    user: process.env.PGUSER,
  })

  const user_data = req.body

  try{
    await client.connect()

    const vres = await client.query( verify_query, [user_data.name] )

    if( vres.rowCount > 0 ){
      client.end();
      res.status( 400 ).send( { error: 'User already exists' } )
      return
    }

    bcrypt.hash( user_data.pass, bcrypt_niter ).then( phash => {
      client.query( insert_query, [user_data.name, phash, user_data.email, +(new Date())] ).then( qres => {
        const user_id = qres.rows[0].id;

        const user_token = jwt.sign({
          name: user_data.name,
          id: user_id
        }, process.env.JWT_TOKEN as string )
    
        client.end();
        res.status( 201 ).json({ token: user_token })
      })
    })
  }catch( err ){ // connect error
    client.end();
    console.log( err )
    res.status( 500 ).json( { error: 'Internal Server error' } )
  }
}
