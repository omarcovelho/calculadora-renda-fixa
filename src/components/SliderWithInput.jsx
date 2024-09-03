import React from 'react';
import {
  Slider,
  TextField,
  Grid,
  Typography,
  InputAdornment,
} from '@mui/material';

function SliderWithInput({ label, value, onChange, min, max, step }) {
  const handleSliderChange = (event, newValue) => {
    onChange(newValue);
  };

  const handleInputChange = (event) => {
    // Ensure the input is within the range
    let inputValue = Number(event.target.value);
    if (inputValue > max) {
      inputValue = max;
    } else if (inputValue < min) {
      inputValue = min;
    }
    onChange(inputValue);
  };

  const handleBlur = () => {
    // Adjust values on blur to ensure they remain within range
    if (value < min) {
      onChange(min);
    } else if (value > max) {
      onChange(max);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Typography gutterBottom variant="body2">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Slider
          value={typeof value === 'number' ? value : 0}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          min={min}
          max={max}
          step={step}  // Utilizing the step prop for finer control
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          value={value}
          margin="dense"
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: step,
            min: min,
            max: max,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
            style: { width: '100%' }  // Ensuring input field takes full grid width
          }}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

export default SliderWithInput;
