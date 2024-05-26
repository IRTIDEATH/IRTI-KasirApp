import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: {label: 'Password', type: 'password'},
            },

            async authorize(credentials) {
                const {email, password} = credentials as {
                    email: string;
                    password: string;
                };
                const user: any = await signIn(email)
                if(user) {
                    // cek password udh bener atau gk, dengan compare(bcrypt). compare password yang di input oleh user dengan password user.password (password yang ada di database)
                    const passwordConfrim = await compare(password, user.password)
                    if (passwordConfrim) {
                        return user
                    }
                    return null
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account, profile, user }: any) {
            if(account?.provider === 'credentials') {
                token.email = user.email
                token.fullname = user.fullname
                token.role = user.role
                token.id = user.id
            }

            return token
        },

        async session({session, token}: any) {
            if("email" in token) {
                session.user.email = token.email
            }

            if("fullname" in token) {
                session.user.fullname = token.fullname
            }

            if("role" in token) {
                session.user.role = token.role
            }

            if("id" in token) {
                session.user.id = token.id
            }

            return session
        }
    },  
    pages: {
        signIn: '/auth/login'
    }
}

export default NextAuth(authOptions)