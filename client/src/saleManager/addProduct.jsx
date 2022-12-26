import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function HelperTextAligned() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >
      <TextField
        id="demo-helper-text-aligned"
        label="Product name"
        type={text}
        required
      />
      <TextField
        id="demo-helper-text-aligned"
        label="Product ID"
        type={Number}
        required
      />
      <TextField
        id="demo-helper-text-aligned"
        label="Product quantity"
        type={Number}
        required
      />
        <TextField
        id="demo-helper-text-aligned"
        label="Product price"
        type={Number}
        required
      />
        <TextField
        id="demo-helper-text-aligned"
        label="Product Category"
        type={text}
        required
      />
        <TextField
        id="demo-helper-text-aligned"
        label="Product Descriptiom"
        type={text}
        required
      />

    </Box>
  );
}
