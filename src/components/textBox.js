import React from 'react';
import TextField from '@mui/material/TextField';

export const TextBox = ({
  fieldName,
  formType,
  value,
  handleChange,
  index,
  isActive,
}) => {
  const props =
    formType === 'multiline'
      ? { multiline: true, minRows: '3' }
      : { type: formType };

  return (
    <TextField
      id={index.toString()}
      defaultValue={value}
      label={fieldName}
      fullWidth
      margin="normal"
      disabled={!isActive}
      onChange={handleChange.bind('null', index)}
      {...props}
    />
  );
};
