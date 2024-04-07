"use client";

import "client-only";

import { FormEvent } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import { FormControl, Input } from "@mui/material";

const DEBUG = true;

export default function SignInBtn(props) {
  const theme = useTheme();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (DEBUG) {
      console.log({
        email: data.get("email"),
        password: data.get("password"),
      });
    }
  };

  return (
    <Stack
      py={5}
      spacing={4}
      justifyContent="flex-start"
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
        <Avatar sx={{ bgcolor: theme.palette.secondary.light }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" fontWeight={900}>
          Sign in
        </Typography>
      </Stack>
      <Stack>
        <FormControl variant="outlined">
          <InputLabel htmlFor="email" color="primary">
            Email
          </InputLabel>
          <Input
            // required
            id="email"
            size="small"
            fullWidth
            name="email"
            autoComplete="email"
            autoFocus
          ></Input>
        </FormControl>
        <TextField
          id="password"
          size="small"
          color="primary"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
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
        Login
      </Button>
      <Link href="/kaptchame">
        <Typography
          variant="body2"
          color={theme.palette.text.primary}
          fontWeight="light"
        >
          Create an account?
        </Typography>
      </Link>
    </Stack>
  );
}
