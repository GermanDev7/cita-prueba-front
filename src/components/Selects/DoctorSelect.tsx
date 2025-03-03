import React, { useCallback } from 'react';
import Select, { SingleValue } from 'react-select';
import { GenericOptionsSelect } from '../../Interfaces/GenericOptionsSelect';

interface DoctorSelectProps {
  value: GenericOptionsSelect | null;
  options: GenericOptionsSelect[];
  onChange: (option: SingleValue<GenericOptionsSelect>) => void;
}

const DoctorSelect: React.FC<DoctorSelectProps> = ({ value, options, onChange }) => {
  const handleDoctorChange = useCallback(
    (selectedOption: SingleValue<GenericOptionsSelect>) => {
      onChange(selectedOption);
    },
    [onChange]
  );

  return (
    <Select
      options={options}
      value={value}
      onChange={handleDoctorChange}
      placeholder="Seleccione un doctor..."
      isClearable
    />
  );
};

export default DoctorSelect;
