import NextAuth, { NextAuthOptions } from "next-auth"
import SalesforceProvider from "next-auth/providers/salesforce"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    SalesforceProvider({
      authorization: {
        params: {
          prompt: "consent",
          scope: "openid profile email offline_access",
        },
      },
      clientId: env.SALESFORCE_CLIENT_ID,
      clientSecret: env.SALESFORCE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
}

export default NextAuth(authOptions)
