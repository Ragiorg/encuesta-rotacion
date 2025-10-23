
import { NextAuthOptions, Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./db"
import bcrypt from "bcryptjs"

// Extend the Session user type to include custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      organizationId?: string
      organizationName?: string
      hiredAt?: string
      departmentId?: string
      departmentName?: string
      positionId?: string
      positionTitle?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          include: {
            Organization: true,
            department: true,
            position: true,
            Account: false,
            Session: false,
            SurveyResponse: false,
          },
        });

        console.log("User found:", user);

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password || ""
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          organizationId: user.organizationId || undefined,
          organizationName: user.Organization?.name,
          hiredAt: user.hiredAt || undefined,
          departmentId: user.departmentId || undefined,
          departmentName: user.department?.name || undefined,
          positionTitle: user.position?.title || undefined,
          positionId: user.positionId || undefined,
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as typeof user & {
          role?: string
          organizationId?: string
          organizationName?: string
          hiredAt?: string
          departmentId?: string
          positionId?: string
          positionTitle?: string
          departmentName?: string
        }
        token.role = customUser.role
        token.organizationId = customUser.organizationId
        token.organizationName = customUser.organizationName
        token.hiredAt = customUser.hiredAt
        token.departmentId = customUser.departmentId
        token.positionId = customUser.positionId
        token.positionTitle = customUser.positionTitle
        token.departmentName = customUser.departmentName
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub || ""
        session.user.role = token.role as string
        session.user.organizationId = token.organizationId as string
        session.user.organizationName = token.organizationName as string
        session.user.hiredAt = token.hiredAt as string
        session.user.departmentId = token.departmentId as string
        session.user.positionId = token.positionId as string
        session.user.positionTitle = token.positionTitle as string
        session.user.departmentName = token.departmentName as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
}
