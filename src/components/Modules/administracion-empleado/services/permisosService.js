import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const BASE_URL = 'http://localhost:8082/recursos_humanos/api';

// Datos mock para desarrollo
const mockPermisos = [
    {
        id: 1,
        tipoPermiso: "ECONOMICO",
        fechaSolicitud: "2025-02-10",
        fechaInicio: "2025-02-15",
        fechaFin: "2025-02-17",
        status: "APROBADO",
        motivo: "Asuntos personales",
        observaciones: "Documentación completa"
    },
    {
        id: 2,
        tipoPermiso: "TEMPORAL",
        fechaSolicitud: "2025-02-05",
        fechaInicio: "2025-03-01",
        fechaFin: "2025-03-15",
        status: "PENDIENTE",
        motivo: "Capacitación profesional",
        observaciones: "En revisión"
    }
];

export const permisosService = {
    obtenerPermisos: async () => {
        try {
            // Por ahora retornamos datos mock
            // Cuando el backend esté listo, descomentar el código de la API
            return mockPermisos;
            
            /*const response = await axios.get(`${BASE_URL}/empleados/mis-permisos`);
            return response.data;*/
        } catch (error) {
            console.error('Error al obtener permisos:', error);
            throw error;
        }
    },

    filtrarPermisos: async (filtros) => {
        try {
            let permisosFiltered = [...mockPermisos];
            
            if (filtros.tipo && filtros.tipo !== 'todos') {
                permisosFiltered = permisosFiltered.filter(p => 
                    p.tipoPermiso === filtros.tipo
                );
            }
            
            if (filtros.fechaInicio) {
                permisosFiltered = permisosFiltered.filter(p => 
                    new Date(p.fechaInicio) >= new Date(filtros.fechaInicio)
                );
            }
            
            if (filtros.fechaFin) {
                permisosFiltered = permisosFiltered.filter(p => 
                    new Date(p.fechaFin) <= new Date(filtros.fechaFin)
                );
            }
            
            return permisosFiltered;
            
            /*const response = await axios.get(
                `${BASE_URL}/empleados/mis-permisos/filtrar`,
                { params: filtros }
            );
            return response.data;*/
        } catch (error) {
            console.error('Error al filtrar permisos:', error);
            throw error;
        }
    },

    exportarPDF: async (permisos) => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Reporte de Licencias y Permisos', 14, 15);
        
        const headers = [['Tipo', 'Fecha Solicitud', 'Período', 'Estado', 'Motivo']];
        const data = permisos.map(permiso => [
            permiso.tipoPermiso,
            new Date(permiso.fechaSolicitud).toLocaleDateString(),
            `${new Date(permiso.fechaInicio).toLocaleDateString()} - ${new Date(permiso.fechaFin).toLocaleDateString()}`,
            permiso.status,
            permiso.motivo
        ]);

        doc.autoTable({
            head: headers,
            body: data,
            startY: 25,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [128, 0, 0] }
        });

        doc.save('licencias-permisos.pdf');
    },

    exportarExcel: async (permisos) => {
        const worksheet = XLSX.utils.json_to_sheet(permisos.map(p => ({
            'Tipo de Permiso': p.tipoPermiso,
            'Fecha de Solicitud': new Date(p.fechaSolicitud).toLocaleDateString(),
            'Fecha Inicio': new Date(p.fechaInicio).toLocaleDateString(),
            'Fecha Fin': new Date(p.fechaFin).toLocaleDateString(),
            'Estado': p.status,
            'Motivo': p.motivo,
            'Observaciones': p.observaciones
        })));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Licencias y Permisos");
        
        XLSX.writeFile(workbook, "licencias-permisos.xlsx");
    }
};