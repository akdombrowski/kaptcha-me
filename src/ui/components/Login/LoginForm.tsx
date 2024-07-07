"use client";

import "client-only";

import { FormEvent } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { useTheme, alpha } from "@mui/material/styles";

import DifficultyRadioBtnGroup from "@/components/Login/DifficultyRadioBtnGroup";
import DifficultySlider from "@/components/Login/DifficultySlider";

import loginFormSubmit from "@/actions/loginFormSubmit";

const DEBUG = true;

export default function LoginForm(props) {
  const theme = useTheme();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (DEBUG) {
      // !!! - CAREFUL - !!!
      // THIS IS CLIENT SIDE CODE
      console.log({
        email: data.get("email"),
        password: data.get("password"),
      });
    }
  };

  return (
    <Stack
      id="loginForm"
      name="loginForm"
      justifyContent="flex-start"
      alignItems="stretch"
      component="form"
      noValidate
      action={loginFormSubmit}
      width="100%"
      // sx={{ backgroundColor: alpha("#000", 0.9), borderRadius: "10%" }}
    >
      <Stack
        justifyContent="flex-start"
        px={{ xs: 2, sm: 3 }}
        component={Paper}
        elevation={6}
        py={{ xs: 2, md: 4 }}
        sx={{
          // backgroundColor: alpha("#000", 0.75),
          borderRadius: "10%",
          backgroundBlendMode: "overlay"
        }}
      >
        <Stack
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
          py={0}
          my={0}
        >
          <Avatar
            sx={{
              width: "30px",
              height: "30px",
              bgcolor: theme.palette.text.secondary,
            }}
          >
            <LockOutlinedIcon fontSize="small" />
          </Avatar>
          <Typography component="h1" variant="h3">
            Sign in
          </Typography>
        </Stack>
        <Stack spacing={0} my={1}>
          <TextField
            id="email"
            size="small"
            color="primary"
            margin="normal"
            fullWidth
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            sx={{ my: 0 }}
          />
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
            sx={{ mt: 1, mb: 0 }}
          />
        </Stack>
        <Box mt={1}>
          <DifficultySlider formID="loginForm" />
        </Box>
        <Stack spacing={1} my={1}>
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
