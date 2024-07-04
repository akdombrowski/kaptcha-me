import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function DifficultyRadioBtnGroup() {
  return (
    <FormControl id="difficulty-radio-btn-group-label">
      <FormLabel id="difficulty-radio-btn-group-label">Difficulty</FormLabel>
      <RadioGroup
        aria-labelledby="difficulty-radio-btn-group-label"
        defaultValue="medium"
        name="radio-btn-group"
      >
        <FormControlLabel
          value="easy"
          control={<Radio size="small" />}
          label="Go easy on me"
        />
        <FormControlLabel
          value="medium"
          control={<Radio size="small" />}
          label="Little to no pink in the middle"
        />
        <FormControlLabel
          value="hard"
          control={<Radio size="small" />}
          label="That all you got?"
        />
      </RadioGroup>
    </FormControl>
  );
}
