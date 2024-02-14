import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import SignInBtn from "#/src/ui/sign-in-btn";

export const SignInPage = () => {
  return (
    <Grid container xs={12} padding={"1vw 1vh"} height="100%" width="100%">
      <CssBaseline />
      <Grid
        xs={false}
        sm={4}
        md={5}
        sx={{
          backgroundImage:
            "url(https://i.postimg.cc/Xq7JXNYH/recaptcha-katpchame.webp)",
          backgroundRepeat: "no-repeat",
          backgroundColor: "background",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      />
      <Grid
        xs={12}
        sm={8}
        md={7}
        component={Paper}
        elevation={6}
        sx={{
          backgroundColor: "background",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <SignInBtn />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInPage;
