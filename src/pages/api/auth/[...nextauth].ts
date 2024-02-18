import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import axios from "axios";

export type IUser = {
  id: string;
  username: string;
  token: string;
};

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<IUser | null> {
          const user = {
              id: "1",
              username: "Almaz Kambarov",
              token: "token123456789",
            };
            //здесь должно отправляться запрос к серверу и 
          try {
            // const userData = {
            //     email:credentials?.email,
            //     password:credentials?.password,
            // }
            // const user = await axios({
            //     method:"POST",
            //     url:"exaple/api",
            //     data:userData
            // }).then(res=>res.data)
            if (user) {
              return user;
            }
          } catch (err: any) {
            console.log("try-cath", err.message);
            return null;
          }
          return null;
        },
    }),
  ],
  pages: {
    signIn: "/auth",
    signOut: "/auth/signout",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session(data: any) {
      data.session = {
        ...data.session,
        user: { ...data.token },
      };
      return data.session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
