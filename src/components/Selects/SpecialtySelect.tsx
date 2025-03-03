import React from 'react';
import Select, { SingleValue } from 'react-select';
import { GenericOptionsSelect } from '../../Interfaces/GenericOptionsSelect';



interface SpecialtySelectProps {
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

const SpecialtySelect: React.FC<SpecialtySelectProps> = ({ onChange }) => {
  return (
    <Select
      options={specialtyOptions}
      onChange={onChange}
      placeholder="Select a specialty..."
      isClearable
    />
  );
};

export default SpecialtySelect;
