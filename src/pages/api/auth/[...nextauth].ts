
import NextAuth from 'next-auth'
import  GitHubProvider from 'next-auth/providers/github'
import { query as q } from 'faunadb'
import { signIn } from 'next-auth/react'
import { fauna } from '../../../services/fauna'
import { FaUnderline } from 'react-icons/fa'

export default NextAuth({
    secret: process.env.SECRET,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            //scope: 'read:user'
        }),
    ],
  
    callbacks: {
        async signIn({user, account, profile, email, credentials}){
            const mail = user.email
            try{
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(user.email)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            {data: {mail}}
                        ),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(user.email)
                            )
                        )
                    )
                )
                return true
            }catch{
                return false
            }
            
            
        }
    }
  
    

}) 