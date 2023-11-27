import { signIn } from "next-auth/react"


export default async function regSignUp (values) {
  let errorMes;
  let jwt;
  let user;
  let isLoading;
  let message;

  try {
    const response = await fetch(`{${process.env.API_LINK}}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (data?.error) {
      message = `${data?.error.message}`
    throw data?.error;
  } else {
    // set the token
    jwt = data.jwt

    // set the user
    user = data.user

    console.log(data.jwt, data.user, "JJJWWWWW")

  //   message.success(`Welcome to Social Cards ${data.user.username}!`);

    message = `Welcome to casino, ${data.user.username}`

  //   navigate("/profile", { replace: true });
  }
  }
  catch (error) {
    console.error(error);
    errorMes = error?.message ?? "Something went wrong!";
  } 
  finally {
    isLoading = false
  }    

  return errorMes, jwt, user, isLoading, message
}