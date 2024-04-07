import Typography from "@mui/material/Typography";
import Link from "next/link";

export const Copyright = (...props: any[]) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright  "}
      <Link color="inherit" href="https://kaptchame.com/">
        Anthony Dombrowski
      </Link>{" "}
      {"" + new Date().getFullYear() + "."}
    </Typography>
  );
};

export default Copyright;
