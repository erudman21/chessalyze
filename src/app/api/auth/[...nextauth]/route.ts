import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../prisma";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      if (!existingUser) {
        await prisma.user.create({ data: { id: user.id, email: user.email! } });
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
