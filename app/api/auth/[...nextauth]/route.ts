import { prisma } from "@/utils/connect";
import NextAuth, { type NextAuthOptions } from "next-auth";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { use } from "react";

export const authOptions: NextAuthOptions = {
  /*session: {
    strategy: "jwt",
  },*/
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { 
          label: "Password", 
          type: "password" 
        },
      },
      authorize : async(credentials, request) => {
        if(credentials?.email && credentials.password){
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
              password: credentials?.password
            },
            include: {
              role: true,
              student: {
                include: {
                  faculty: true
                }
              },
            }
          })
          if(user){
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: {
                id: user.roleId,
                name: user.role?.name,
              },
              faculty: {
                id: user?.student?.faculty?.id,
                name: user?.student?.faculty?.name
              }
            }
          }
          return null
        }
        return null
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, account, profile }) => {
      if (account) {
        const u = account as unknown as any;
        token.accessToken = account.access_token
        token.id = u.id
        token.randomKey = u.randomKey
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
