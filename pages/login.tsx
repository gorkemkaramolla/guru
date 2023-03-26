import React from "react";

import { useRouter } from "next/router";
import Signup from "@/components/Forms/Signup";
import Login from "@/components/Forms/Login";

const LoginPage = () => {
  const router = useRouter();
  const { signup } = router.query;
  if (signup === "true") return <Signup />;
  else return <Login />;
};

export default LoginPage;
