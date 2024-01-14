import { SignInFormData } from "./Pages/Login";
import { RegisterFormData } from "./Pages/Register";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`http://localhost:5000/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`http://localhost:5000/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const signOut = async () => {
  const response = await fetch("http://localhost:5000/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to log out");
  }
};

export const validateToken = async () => {
  const response = await fetch(
    `http://localhost:5000/api/auth/validate-token`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Token Invalid");
  }

  return response.json();
};
