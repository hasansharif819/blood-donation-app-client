import { Grid, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { useState } from "react";

const BloodTypeSelect = () => {
  const [bloodType, setBloodType] = useState("");

  const handleChange = (event: any) => {
    setBloodType(event.target.value);
  };

  const bloodGroups = [
    "A_POSITIVE",
    "A_NEGATIVE",
    "B_POSITIVE",
    "B_NEGATIVE",
    "AB_POSITIVE",
    "AB_NEGATIVE",
    "O_POSITIVE",
    "O_NEGATIVE",
  ];

  return (
    <Grid item md={6}>
      <FormControl fullWidth>
        <InputLabel id="blood-type-label">Blood Type</InputLabel>
        <Select
          labelId="blood-type-label"
          id="blood-type"
          value={bloodType}
          label="Blood Type"
          onChange={handleChange}
          name="bloodType"
        >
          {bloodGroups.map((group) => (
            <MenuItem key={group} value={group}>
              {group}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default BloodTypeSelect;
