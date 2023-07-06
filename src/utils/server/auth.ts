import { type GetServerSidePropsContext } from "next"
import { getServerSession, type NextAuthOptions, type DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./db"
import { signOut } from "next-auth/react"


declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({     
      ...session,
      user: {
        ...session.user,
        id: user.id,
        //@ts-ignore
        role: user.role,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER || 'http://localhost:3000',
        port: 587,
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASSWORD || "",
        },
      },
      from: process.env.EMAIL_FROM || "default@default.com",
      ... (process.env.NODE_ENV !== "production"
      ? {
          sendVerificationRequest({ url }) {
            console.log("LOGIN LINK", url)
          },
        }
      : {}),
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout"
  }
}

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"]
  res: GetServerSidePropsContext["res"]
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
