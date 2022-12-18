import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'universal-cookie'
import simpleQuery from './no_brain_db' // .ts

import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'

declare module "jsonwebtoken" {
  export interface JwtPayload {
    name: string,
    id: number
  }
}

const token_cookie_name = "auth-jwt"

export default async function handler( req: NextApiRequest, res: NextApiResponse ){
  let post_200 = false
  let subid = 0

  try{
    const cookies = new Cookies( req.headers.cookie )
    const token = cookies.get( token_cookie_name )

    let user_token: JwtPayload = { name: 'gigel', id: -1 }

    try{
      user_token = jwt.verify( token, process.env.JWT_TOKEN as string ) as JwtPayload
    }catch( err ){
      console.log( err )
      res.status( 400 ).json({ error: 'Not logged in' })
      return
    }

    const ret = await simpleQuery(
      "INSERT INTO submissions (user_id, problem, verdict, sdate, points, time, memory, tests) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
      [user_token.id, req.body.pbname, 'Evaluating...', +(new Date()), 0, 0, 0, JSON.stringify( { error: 'Evaluating' } )]
    )

    res.status( 200 ).json({ message: 'Submission sent' })

    post_200 = true

    subid = ret[0].id

    const response = await fetch( process.env.EVAL_SERVER as string, {
      method: "post",
      body: JSON.stringify( {} ),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      }
    })

    const json_response = await response.json()

    await simpleQuery(
      "UPDATE submissions SET verdict=$1, points=$2, time=$3, memory=$4, tests=$5 WHERE id=$6",
      [json_response.verdict, json_response.points, json_response.time, json_response.memory, JSON.stringify( json_response.tests ), subid]
    )
  }catch( err ){
    console.log( err )
    if( !post_200 )
      res.status( 500 ).json({ error: 'Internal Server error' })
    else{
      await simpleQuery(
        "UPDATE submissions SET verdict=$1, tests=$2 WHERE id=$2",
        ['Skiped evaluation', JSON.stringify( { error: 'Internal Server Error (500): Skipped evaluation' } ), subid]
      )
    }
  }
}