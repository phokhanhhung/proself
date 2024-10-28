import CredentialsProvider from "next-auth/providers/credentials";
import AxiosInstance from 'axios';
import { signIn } from "next-auth/react";
import NextAuth from "next-auth";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "User Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const {username, password} = credentials as any;
        console.log(username, password);
        const res = await AxiosInstance.get("https://jsonplaceholder.typicode.com/users/1");
        const user  = res.data;

        if(res.status === 200 && user && username === 'hungpk' && password === 'hungpk2409') {
          console.log("aduma", user)
          return user;
        }

        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async redirect({ url, baseUrl } : { url: string; baseUrl: string }) {
      return baseUrl;
    },
    async signOut() {
      return '/login';
    }
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };