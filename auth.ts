import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {},
  session: {},
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials.password !== "4701") {
          throw new Error("Password Error!!");
        }
        return {
          id: "id",
          email: "squirrel309@naver.com",
        };
      },
    }),
  ],
});
