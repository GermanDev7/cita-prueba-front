// src/components/Selects/DoctorSelect.tsx
import React, { useEffect, useState, useCallback } from 'react';
import Select, { SingleValue } from 'react-select';
import { getDoctorsBySpecialty } from '../../services/doctorAPI';
import { GenericOptionsSelect } from '../../Interfaces/GenericOptionsSelect';



interface DoctorSelectProps {
    specialty: string;
    onChange: (option: SingleValue<GenericOptionsSelect>) => void;
}

const DoctorSelect: React.FC<DoctorSelectProps> = ({ specialty, onChange }) => {

    const [doctorOptions, setDoctorOptions] = useState<GenericOptionsSelect[]>([]);

    console.log(specialty)
    useEffect(() => {
        if (specialty) {
            getDoctorsBySpecialty(specialty)
                .then((doctors) => {
                    const doctorOptions = doctors.map((doc) => ({
                        value: doc.doctorId,
                        label: doc.doctorName,
                    }));
                    setDoctorOptions(doctorOptions);
                })
                .catch((err) => {
                    console.error('Error al cargar doctores:', err);
                    setDoctorOptions([]);
                });
        } else {
            setDoctorOptions([]);
        }
    }, [specialty]);

    const handleDoctorChange = useCallback((option: SingleValue<GenericOptionsSelect>) => {
        onChange(option);
    }, [onChange]);

    return (
        <Select
            options={doctorOptions}
            onChange={handleDoctorChange}
            placeholder="Seleccione un doctor..."
            isClearable
            isDisabled={!specialty}
        />
    );
};

export default DoctorSelect;
