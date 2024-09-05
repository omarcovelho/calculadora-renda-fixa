import React from 'react';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { NumericFormat } from 'react-number-format';  // Correct Import

// Custom component to format numbers as currency
const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  // Ensure no leading zeros and properly formatted
  const handleValueChange = (values) => {
    // Remove leading zeros
    let newValue = values.value.replace(/^0+(?!$)/, '');
    onChange({
      target: {
        value: newValue,
      },
    });
  };

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      valueIsNumericString // Remove from DOM elements; ensure it's only applied in NumericFormat
      onValueChange={handleValueChange}
    />
  );
});

const SliderWithInput = ({ label, min, max, step, value, onChange, icon, format }) => {
  const handleSliderChange = (event, newValue) => {
    const validatedValue = Math.min(Math.max(newValue, min), max); // Validate range
    onChange(validatedValue); // Call parent onChange
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Slider
          value={value}
          onChange={handleSliderChange}
          min={min}
          max={max}
          step={step}
          aria-labelledby="input-slider"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          fullWidth
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          InputProps={{
            inputComponent: format === 'currency' ? NumericFormatCustom : undefined,
            startAdornment: icon ? (
              <InputAdornment position="start">{icon}</InputAdornment>
            ) : null,
            inputProps: {
              step: step,
              min: min,
              max: max,
              type: format === 'currency' ? 'text' : 'number', // Use 'number' for non-currency inputs
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SliderWithInput;