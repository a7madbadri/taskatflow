import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./lib/prisma";

const googleClientId = process.env.AUTH_GOOGLE_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_CLIENT;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: googleClientId || "",
      clientSecret: googleClientSecret || "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.id = user.id;
      }
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
