import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export const DropdownSelect = ({ fieldName, values, handleChange, index }) => {
  return (
    <div>
      <TextField
        id={index.toString()}
        select
        fullWidth
        margin="normal"
        label={fieldName}
        defaultValue={values[0]}
        onChange={handleChange.bind(null, index)}
      >
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};
