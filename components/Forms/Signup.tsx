import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { styled } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/router";
import Link from "next/link";

import { getSession, signIn } from "next-auth/react";
import axios from "axios";
import CustomButton from "@/components/CustomButton";
interface Props {
  // define the component props here
}
const Signup: React.FC<Props> = ({}) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
    await axios
      .post("/api/user/register", { name, surname, email, password })
      .then((res) =>
        res.status === 200
          ? router.push("/")
          : router.push("/login?signup=true")
      )
      .catch((e) => console.log(e));
  };

  return (
    <Container component="main" maxWidth="xs" className="h-screen">
      <CssBaseline />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "8px",
        }}
      >
        <Avatar
          style={{
            margin: "8px",
            backgroundColor: "#f50057",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            marginTop: "24px",
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            autoFocus
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{
              margin: "24px 0px 16px",
            }}
          >
            Sign Up
          </CustomButton>
        </form>
      </div>
      <div className="text-right">
        Already have an account?{" "}
        <Link href={"/login"} className="text-blue-600">
          Go to Login
        </Link>
      </div>
      <hr className="w-4/5 mx-auto my-4 border-black" />
      <Button
        fullWidth
        sx={{ textTransform: "none", py: 1.5 }}
        variant="contained"
        onClick={() => signIn()}
      >
        <GoogleIcon sx={{ pr: "0.4rem" }} /> Sign in with Google
      </Button>
    </Container>
  );
};
export default Signup;
