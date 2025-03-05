import { useQuery } from '@tanstack/react-query';
import {api} from '../../utils/api';

// Funkcija za dobijanje liste mašina
export const fetchMachines = async () => {
  const data = await api('/api/machines/');
  return data.machines; // Pristupamo nizu `machines` unutar odgovora
};

// Hook za dobijanje liste mašina
export const useMachineListQuery = () => {
  return useQuery({
    queryKey: ['machines'], // Jedinstveni ključ za upit
    queryFn: fetchMachines, // Funkcija za dobijanje podataka
  });
};
