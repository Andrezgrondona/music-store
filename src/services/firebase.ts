


import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBAbMu01zy1JgO1aVW1fZdvokYJGIFYda8",
  authDomain: "music-store-4266c.firebaseapp.com",
  projectId: "music-store-4266c",
  storageBucket: "music-store-4266c.appspot.com",
  messagingSenderId: "692597166506",
  appId: "1:692597166506:web:00326578fdc80bf0791bd3",
  measurementId: "G-V59VNH38YF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//CRUD de productos para la base de datos de Firebase "Products"

export const getInstruments = async () => {
  const querySnapshot = await getDocs(collection(db, 'Products'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const createInstrument = async (instrument: any) => {
  await addDoc(collection(db, 'Products'), instrument);
};

export const deleteInstrument = async (id: string) => {
  await deleteDoc(doc(db, 'Products', id));
};


export const updateInstrument = async (id: string, updatedInstrument: any) => {
  await updateDoc(doc(db, 'Products', id), updatedInstrument);
};


//Funcion para crear la orden en la DB de firebase "Orders"

export const createOrder = async (order: { name: string; price: number, quantity: number}) => {
  await addDoc(collection(db, 'orders'), order);
};

