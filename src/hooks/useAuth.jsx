import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserInfo, clearUserInfo } from '../store/userSlice';

const fetchUserInfo = async (token) => {
  // Simulacion para consumir un endpoint para obtener los datos del usuario.
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        name: 'John Doe',
        roles: ['admin', 'editor'],
        permissions: ['read', 'write'],
      });
    }, 1000)
  );
};

const useAuth = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Aqui vamos a obtener el token del usuario logueado
    //const token = sessionStorage.getItem('jwt');

    //pero por ahora mandamos cualquier cosa
    const token = 'token';
    if (token) {
      // Llamada simulada al backend para obtener la información del usuario.
      fetchUserInfo(token).then((userInfo) => {
        dispatch(setUserInfo(userInfo));
        setLoading(false);
      });
    } else {
      dispatch(clearUserInfo());
      setLoading(false);
    }
  }, [dispatch]);

  return loading;
};

export default useAuth;
