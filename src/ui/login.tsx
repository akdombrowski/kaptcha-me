"use client";
import "client-only";

import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import SignInBtn from "@/ui/sign-in-btn";
import { alpha, useTheme } from "@mui/material/styles";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import CardImageHeader from "./CardImageHeader";

export const Login = () => {
  const theme = useTheme();

  return (
    <Container maxWidth={false} height="100vh">
      <Card height="100%">
        <CardHeader>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
        </CardHeader>
        <CardContent height="33vh" sx={{ p: 0 }}>
          <Box
            position="relative"
            width="100%"
            maxHeight="33vh"
            sx={{ aspectRatio: 535 / 867, overflow: "hidden" }}
          >
            <CardImageHeader />
          </Box>
        </CardContent>
        <CardContent>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </CardContent>
        <CardActions>
          <SignInBtn />
        </CardActions>
      </Card>
    </Container>
  );
};

export default Login;
