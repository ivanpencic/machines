import { useQuery } from '@tanstack/react-query';
import {api} from '../../utils/api';

// Funkcija za dobijanje detalja masine
export const fetchMachineDetails = async (machineId) => {
  const data = await api(`/api/machines/${machineId}/`);
  return data; 
};

// Hook za dobijanje detalja mašina
export const useMachineDetailsQuery = ({machineId}) => {
  return useQuery({
    queryKey: ['machines', machineId], // Jedinstveni ključ za upit
    queryFn: () => fetchMachineDetails(machineId), // Funkcija za dobijanje podataka
  });
};
