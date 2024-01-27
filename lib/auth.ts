import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getUserById } from "@/actions/get-user";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        // eslint-disable-next-line no-param-reassign
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.id = existingUser.id;

      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
