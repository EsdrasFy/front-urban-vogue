import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NewDataUser from "../../NewDataUser";
import axios from "axios";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        credential: { label: "credential", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials, req) {
        console.log("authorize chamado");

        const response = await fetch("http://localhost:9090/req/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            credential: credentials?.credential,
            password: credentials?.password,
            redirect: false,
          }),
        });
        console.log("response api login");
        console.log(response);

        const user = await response.json();
        if (user && response.ok) {
          console.log("user");

          console.log(user);

          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session = token.user as any;
      const id = session.user.user_id;
      const url = `http://localhost:9090/show/${id}`;

      let apiResp = await axios.get(url, {});
      session.user = apiResp.data.user as any;
      console.log("atualizou");
      console.log(apiResp.data);

      return session;
    },
  },
};
const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST, nextAuthOptions };
