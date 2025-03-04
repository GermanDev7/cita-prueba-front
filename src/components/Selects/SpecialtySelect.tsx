import React from 'react';
import { SingleValue } from 'react-select';
import { GenericOptionsSelect } from '../../Interfaces/GenericOptionsSelect';
import { Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';

interface SpecialtySelectProps {
  value: GenericOptionsSelect | null;
  onChange: (option: SingleValue<GenericOptionsSelect>) => void;
}

const specialtyOptions: GenericOptionsSelect[] = [
  { value: 'Cardiologia', label: 'Cardiologia' },
  { value: 'Neurologia', label: 'Neurologia' },
  { value: 'Ortopedica', label: 'Ortopedica' },
  { value: 'Pediatria', label: 'Pediatria' },
  { value: 'Dermatologia', label: 'Dermatologia' },
  { value: 'Oftanmologia', label: 'Oftanmologia' },
  { value: 'Gastroenterologia', label: 'Gastroenterologia' },
  { value: 'Endocrinologia', label: 'Endocrinologia' },
  { value: 'Urologia', label: 'Urologia' },
  { value: 'Psiquiatria', label: 'Psiquiatria' },
];

const SpecialtySelect: React.FC<SpecialtySelectProps> = ({ value, onChange }) => {

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    const selectedOption = specialtyOptions.find(
      (option) => option.value === selectedValue
    ) || null;

    onChange(selectedOption);
  };

  return (
    <FormControl fullWidth>
      <Select
        labelId="specialty-label"
        id="specialty-select"
        label="Especialidad"

        value={value?.value ?? ''}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="">
          <em>Seleccione una especialidad...</em>
        </MenuItem>
        {specialtyOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SpecialtySelect;
