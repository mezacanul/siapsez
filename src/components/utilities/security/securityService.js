import axios from 'axios';

// This Component will surely change at the time of implementation.
const BASE_URL = 'http://localhost:8082/recursos_humanos/api';

export const securityService = {
    verifyPermissions: async (token) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/verify-jwt`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error verificando permisos:', error);
            throw error;
        }
    },

    getEmployeeChanges: async (employeeId) => {
        try {
            const response = await axios.get(`${BASE_URL}/empleado/obtenerEmpleadoPorId/${employeeId}`);
            return response.data;
        } catch (error) {
            console.error('Error obteniendo historial:', error);
            throw error;
        }
    },

    getFiliacionHistory: async (filiacionId) => {
        try {
            const response = await axios.get(`${BASE_URL}/filiacion/obtenerFiliacionPorId/${filiacionId}`);
            return response.data;
        } catch (error) {
            console.error('Error obteniendo historial de filiación:', error);
            throw error;
        }
    }
};

export default securityService;