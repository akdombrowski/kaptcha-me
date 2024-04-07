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
import Paper from "@mui/material/Paper";
import { useTheme, alpha } from "@mui/material/styles";
import { FormControl, Input } from "@mui/material";

import loginFormSubmit from "@/actions/loginFormSubmit";

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
      justifyContent="flex-start"
      alignItems="stretch"
      component="form"
      noValidate
      action={loginFormSubmit}
      // onSubmit={}
    >
      <Stack
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
        pb={1}
        // component={Paper}
        // elevation={6}
        // sx={{
        //   backgroundColor: alpha(theme.palette.background.paper, 0.5),
        // }}
      >
        <Avatar sx={{ bgcolor: theme.palette.secondary.light }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" fontWeight={900}>
          Sign in
        </Typography>
      </Stack>
      <Stack
        spacing={3}
        justifyContent="flex-start"
        px={{ xs: 2, sm: 3, md: 6 }}
        component={Paper}
        elevation={6}
        py={{ xs: 4, sm: 5, md: 6 }}
        sx={{
          backgroundColor: alpha(theme.palette.background.paper, 0.35),
        }}
      >
        <Stack >
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
        <Stack spacing={1}>
          <Button fullWidth type="submit" variant="contained" color="primary">
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
      </Stack>
    </Stack>
  );
}
