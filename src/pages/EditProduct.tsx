

import { useEffect, useState } from 'react';
import { InstrumentCard } from '../components/InstrumentCard';
import { getInstruments, deleteInstrument, updateInstrument } from '../services/firebase';
import { Flex } from '@chakra-ui/react'; 

interface Instrument {
  id: string;
  name: string;
  description: string;
  urlImage: string;
  price: number;
  stock: number;
}

export const Instrumentos = () => {
  const [instruments, setInstruments] = useState<Instrument[]>([]);

  useEffect(() => {
    const fetchInstruments = async () => {
      const data = await getInstruments();
      setInstruments(data as Instrument[]);
    };
    fetchInstruments();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteInstrument(id);
    setInstruments(instruments.filter((instrument) => instrument.id !== id));
  };

  const handleEdit = async (id: string, updatedInstrument: any) => {
    await updateInstrument(id, updatedInstrument);
    setInstruments(instruments.map((instrument) =>
      instrument.id === id ? { ...instrument, ...updatedInstrument } : instrument
    ));
  };

  return (
    <Flex wrap="wrap" justify="space-between" p={4}>
      {instruments.map((instrument) => (
        <InstrumentCard
          key={instrument.id}
          {...instrument}
          onEdit={handleEdit}
          onDelete={() => handleDelete(instrument.id)}
        />
      ))}
    </Flex>
  );
};
