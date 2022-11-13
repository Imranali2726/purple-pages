/* eslint-disable no-param-reassign */
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserDetail, login, register } from "../../../services/apiCalls";

// eslint-disable-next-line no-undef
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { name: "email", type: "email" },
        password: { name: "password", type: "password" },
        first_name: { name: "first_name", type: "text" },
        last_name: { name: "last_name", type: "text" },
        type: { name: "type", type: "text" },
      },
      async authorize(credentials) {
        const { email, password, lastName, firstName, type } = credentials;

        if (credentials.state !== "login") {
          try {
            const res = await register("register", {
              first_name: firstName,
              last_name: lastName,
              user_type: type,
              email,
              password,
            });
            if (res.data) {
              return res.data.data;
            }
            return false;
          } catch (error) {
            throw new Error(error.response.data.message ?? error.message);
          }
        }
        try {
          const { email, password } = credentials;
          const res = await login("login", { email, password });
          if (res.data) {
            return res.data.data;
          }
          return false;
        } catch (error) {
          throw new Error(error.response.data.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async (user) => {
      const { account } = user;

      if (user.credentials?.state === "register") {
        account.state = user.credentials.state;
        account.firstName = user.user.first_name;
        account.lastName = user.user.last_name;
      }
      account.token = {
        user_token: user.user.token,
        remember_token: user.user.remember_token,
        csrfToken: user.credentials.csrfToken,
      };
      account.id = user.user.id;

      return user;
    },
    jwt: async ({ token, account }) => {
      if (account) {
        if (account.state === "register") {
          token.name = `${account.firstName} ${account.lastName}`;
          token.status = account.status;
        }
        token.token = account.token;
        token.user_id = account.id;
      }
      return token;
    },
    session: async ({ token, session }) => {
      if (session) {
        const res = await getUserDetail("user/get", token.token.user_token);
        session.image = res.data.data.media;
        session.user_type = res.data.data.user_type;
      }
      if (token.status === "register") {
        session.user.name = token.name;
      }
      session.user.token = token.token;
      session.user.user_id = token.user_id;

      return session;
    },
  },
  secret: "abcdefghijklmnop",
};

export default NextAuth(authOptions);
