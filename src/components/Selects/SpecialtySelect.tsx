import React from 'react';
import Select, { SingleValue } from 'react-select';
import { GenericOptionsSelect } from '../../Interfaces/GenericOptionsSelect';

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
  return (
    <Select
      options={specialtyOptions}
      value={value}
      onChange={onChange}
      placeholder="Seleccione una especialidad..."
      isClearable
    />
  );
};

export default SpecialtySelect;
