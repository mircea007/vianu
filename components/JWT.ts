import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token_cookie_name = "auth-jwt"

export function getToken(){
  return cookies.get( token_cookie_name )
}

export function setToken( token: string ){
  cookies.set( token_cookie_name, token, {
    path: '/',
    expires: new Date(+(new Date()) + 30 * 24 * 3600 * 1000)
  })
}

export function removeToken(){
  cookies.remove( token_cookie_name )
}
