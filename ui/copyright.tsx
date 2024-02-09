import Typography from "@mui/material/Typography";
import Link from "#/ui/link";

export const Copyright = (...props: any[]) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://kaptchame.com/">
        Anthony Dombrowski
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
