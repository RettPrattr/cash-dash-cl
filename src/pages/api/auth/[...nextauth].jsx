import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';


export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'my-project',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const value = {
          identifier: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(`${process.env.API_LINK}//api/auth/local`, {
          method: 'POST',
          body: JSON.stringify(value),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const user = await res.json();
        if (!res.ok) {
          throw new Error(user.message);
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
  },
    session: async ({ session, token }) => {
        session.user = token.user
        return session
    }
  },
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code #33FF5D
    logo: '/logo.png', // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  // debug: process.env.NODE_ENV === 'development',
}

// export default NextAuth({
//     theme: {
//         colorScheme: "light",
//       },
//       callbacks: {
//         async jwt({ token }) {
//           token.userRole = "admin"
//           return token
//         },
//       },
// })

export default NextAuth(authOptions)