import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useTheme } from "@mui/material/styles";

import { ChangeEvent } from "react";

export default function DifficultyRadioBtnGroup() {
  const theme = useTheme();

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    console.log("radio difficulty selected:", ev.currentTarget.value);
  };

  return (
    <FormControl id="difficulty-radio-btn-group-label">
      <FormLabel id="difficulty-radio-btn-group-label">Difficulty</FormLabel>
      <RadioGroup
        aria-labelledby="difficulty-radio-btn-group-label"
        defaultValue="medium"
        name="radio-btn-group"
        onChange={handleChange}
      >
        <FormControlLabel
          value="easy"
          control={<Radio size="small" color="success" sx={{ py: 0 }} />}
          label="Go easy on me"
          sx={{
            ".MuiFormControlLabel-label": {
              color: theme.palette.success.main,
              fontSize: ".95rem",
            },
          }}
        />
        <FormControlLabel
          value="medium"
          control={<Radio size="small" color="info" sx={{ py: 0 }} />}
          label="Little to no pink in the middle"
          sx={{
            ".MuiFormControlLabel-label": {
              color: theme.palette.common.white,
              fontSize: ".95rem",
            },
          }}
        />
        <FormControlLabel
          value="hard"
          control={<Radio size="small" color="error" sx={{ py: 0 }} />}
          label="That all you got?"
          sx={{
            ".MuiFormControlLabel-label": {
              color: theme.palette.error.light,
              fontWeight: 700,
              fontSize: ".95rem",
            },
          }}
        />
      </RadioGroup>
    </FormControl>
  );
}
