"use client";

import "client-only";

import { FormEvent } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";

const SignInBtn = (props) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return (
    <Stack
      height="100%"
      spacing={4}
      justifyContent="center"
      alignItems="stretch"
      component="form"
      noValidate
      onSubmit={handleSubmit}
    >
      <Stack
        spacing={5}
        direction="row"
        justifyContent="center"
        alignItems="center"
        pt={3}
      >
        <Avatar sx={{ bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" fontWeight={900}>
          Sign in
        </Typography>
      </Stack>
      <Stack>
        <TextField
          // required
          size="small"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          size="small"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
      </Stack>
      <Button
        href="/kaptchame"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2, mb: 2 }}
      >
        Sign In
      </Button>
      <Link href="/kaptchame">
        <Typography variant="body2">Create an account?</Typography>
      </Link>
    </Stack>
  );
};

export default SignInBtn;
