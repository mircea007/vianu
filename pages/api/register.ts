// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from 'pg'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const client = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
  user: process.env.PGUSER,
})

const verify_query = "SELECT * FROM users WHERE name=$1"
const insert_query = "INSERT INTO users (name, phash, email) OUTPUT INSERTED.id VALUES ($1, $2, $3)"
const bcrypt_niter = 11;

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data> ){
  const user_data = req.body

  try{
    await client.connect() // TODO: RESOLVE CLIENT INSTANCE PROBLEMS!!!!!!!!!!

    const vres = await client.query( verify_query, [user_data.name] )

    if( vres.rowCount > 0 ){
      client.end();
      res.status( 400 ).send( 'User already exists' )
      return
    }

    // vv very interesting idea to store salt along with the hash,
    // making handling the credentials simpler
    const phash = bcrypt.hashSync( user_data.pass, bcrypt_niter )

    console.log( phash )

    const qres = await client.query( insert_query, [user_data.name, phash, user_data.email] )

    console.log( qres )

    //const token = jwt.sign({
    //  name: user_data.name,
    //  id: user_data
    //}, process.env.JWT_TOKEN )

    client.end();
    res.status( 200 ).json( 'User added' )
  }catch( err ){ // connect error
    client.end();
    console.log( err )
    res.status( 500 )
  }
}
