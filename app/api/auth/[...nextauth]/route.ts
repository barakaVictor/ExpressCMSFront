import { prisma } from "@/utils/connect";
import NextAuth, { type NextAuthOptions } from "next-auth";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

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
      async authorize(credentials) {
        // //Handle Auth
        const users = [
            {
              id: "14",
              name: "votertest",
              email: "votertest@gmail.com",
          }
        ];

        const user = users.map((user) => {
          if(credentials?.email === user?.email){
            return user
          }
        })
        if(user){
          return user
        }
        return null;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      //console.log("Session Callback", { session, token });
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
      //console.log("JWT Callback", { token, account, profile });
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
