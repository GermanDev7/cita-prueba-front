import React from 'react';
import { GenericOptionsSelect } from '../../Interfaces/GenericOptionsSelect';
import { MenuItem, Select, SelectChangeEvent, FormControl, InputLabel } from '@mui/material';

interface DoctorSelectProps {
  value: GenericOptionsSelect | null;
  options: GenericOptionsSelect[];
  onChange: (option: GenericOptionsSelect | null) => void;
}

const DoctorSelect: React.FC<DoctorSelectProps> = ({ value, options, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find(
      (option) => String(option.value) === selectedValue
    ) || null;

    onChange(selectedOption);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="doctor-select-label">Doctor</InputLabel>
      <Select
        labelId="doctor-select-label"
        id="doctor-select"
        value={value ? String(value.value) : ""}
        onChange={handleChange}
        label="Doctor"
      >
        <MenuItem value="">
          <em>Seleccione un doctor...</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={String(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DoctorSelect;
