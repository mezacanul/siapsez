import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Importamos el reducer del userSlice

// Configuramos el store con el reducer de usuario
const store = configureStore({
  reducer: {
    user: userReducer, // Asociamos el reducer con la clave 'user'
  },
});

export default store;
