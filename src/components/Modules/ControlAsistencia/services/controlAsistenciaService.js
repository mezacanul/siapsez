// Ejemplo simulado. 
const movimientosMock = [
    {
      id: 101,
      empleadoNombre: "Juan Pérez",
      tipoMovimiento: "ALTA",
      fecha: "2023-12-01",
      estado: "PENDIENTE"
    },
    {
      id: 102,
      empleadoNombre: "María Gómez",
      tipoMovimiento: "BAJA",
      fecha: "2023-12-02",
      estado: "COMPLETADO"
    },
    {
      id: 103,
      empleadoNombre: "Carlos Ruiz",
      tipoMovimiento: "ADSCRIPCION",
      fecha: "2023-12-03",
      estado: "ERROR"
    },
    {
      id: 104,
      empleadoNombre: "Ana Sánchez",
      tipoMovimiento: "ALTA",
      fecha: "2023-12-05",
      estado: "EN_PROCESO"
    }
  ];
  
  const logsMock = [
    {
      id: 1,
      fecha: "2023-12-10T10:15:00",
      movimientoId: 101,
      accion: "Sincronizar",
      resultado: "OK",
      mensaje: "Sincronización exitosa"
    },
    {
      id: 2,
      fecha: "2023-12-10T10:16:00",
      movimientoId: 103,
      accion: "Reintentar",
      resultado: "FALLÓ",
      mensaje: "Error de conexión con servidor"
    },
  ];
  
  // Aquí centralizas las llamadas reales cuando el backend exista
  // Por ahora, simulamos:
  export const controlAsistenciaService = {
    obtenerMovimientos: async () => {
      // EJEMPLO de llamada real:
      // const response = await axios.get('/api/asistencia/movimientos');
      // return response.data;
      return Promise.resolve([...movimientosMock]);
    },
  
    filtrarMovimientos: async (filtros) => {
      // Aquí filtras localmente
      // const response = await axios.get('/api/asistencia/movimientos', { params: filtros });
      // return response.data;
      let data = [...movimientosMock];
  
      if (filtros.tipoMovimiento) {
        data = data.filter((m) => m.tipoMovimiento === filtros.tipoMovimiento);
      }
      if (filtros.estado) {
        data = data.filter((m) => m.estado === filtros.estado);
      }
      if (filtros.empleadoNombre) {
        data = data.filter((m) =>
          m.empleadoNombre.toLowerCase().includes(filtros.empleadoNombre.toLowerCase())
        );
      }
      if (filtros.fechaInicio) {
        data = data.filter((m) => new Date(m.fecha) >= new Date(filtros.fechaInicio));
      }
      if (filtros.fechaFin) {
        data = data.filter((m) => new Date(m.fecha) <= new Date(filtros.fechaFin));
      }
      return Promise.resolve(data);
    },
  
    forzarSincronizacion: async (idMovimiento) => {
      // Realmente llamariamos al endpoint:
      // await axios.post(`/api/asistencia/movimientos/${idMovimiento}/forzar`);
      // Simulamos que cambia a "EN_PROCESO":
      const movIndex = movimientosMock.findIndex((m) => m.id === idMovimiento);
      if (movIndex > -1) {
        movimientosMock[movIndex].estado = "EN_PROCESO";
        setTimeout(() => {
          // Simulamos que termina completado
          movimientosMock[movIndex].estado = "COMPLETADO";
        }, 2000);
      }
      logsMock.push({
        id: logsMock.length + 1,
        fecha: new Date().toISOString(),
        movimientoId: idMovimiento,
        accion: "Forzar",
        resultado: "OK",
        mensaje: "Forzado manual exitoso"
      });
      return Promise.resolve(true);
    },
  
    reintentarSincronizacion: async (idMovimiento) => {
      // Llamada real:
      // await axios.post(`/api/asistencia/movimientos/${idMovimiento}/reintentar`);
      // Se simula que pasa de ERROR a EN_PROCESO y luego a COMPLETADO:
      const movIndex = movimientosMock.findIndex((m) => m.id === idMovimiento);
      if (movIndex > -1) {
        movimientosMock[movIndex].estado = "EN_PROCESO";
        setTimeout(() => {
          movimientosMock[movIndex].estado = "COMPLETADO";
        }, 1500);
      }
      logsMock.push({
        id: logsMock.length + 1,
        fecha: new Date().toISOString(),
        movimientoId: idMovimiento,
        accion: "Reintentar",
        resultado: "OK",
        mensaje: "Reintento en proceso"
      });
      return Promise.resolve(true);
    },
  
    aprobarMovimiento: async (idMovimiento) => {
      // Llamada real:
      // await axios.post(`/api/asistencia/movimientos/${idMovimiento}/aprobar`);
      // Simulamos que al aprobar, cambia de PENDIENTE a EN_PROCESO:
      const movIndex = movimientosMock.findIndex((m) => m.id === idMovimiento);
      if (movIndex > -1) {
        movimientosMock[movIndex].estado = "EN_PROCESO";
      }
      logsMock.push({
        id: logsMock.length + 1,
        fecha: new Date().toISOString(),
        movimientoId: idMovimiento,
        accion: "Aprobación",
        resultado: "OK",
        mensaje: "Aprobado por Admin"
      });
      return Promise.resolve(true);
    },
  
    sincronizacionMasiva: async (idsPendientes) => {
      // Llamada real:
      // await axios.post('/api/asistencia/movimientos/sincronizar-masiva', { ids: idsPendientes });
      // Simulamos cambio de estado a EN_PROCESO, luego COMPLETADO, en batch:
      idsPendientes.forEach((idMov) => {
        const movIndex = movimientosMock.findIndex((m) => m.id === idMov);
        if (movIndex > -1) {
          movimientosMock[movIndex].estado = "EN_PROCESO";
          setTimeout(() => {
            movimientosMock[movIndex].estado = "COMPLETADO";
          }, 2500);
        }
      });
      logsMock.push({
        id: logsMock.length + 1,
        fecha: new Date().toISOString(),
        movimientoId: 0,
        accion: "SincronizaciónMasiva",
        resultado: "OK",
        mensaje: `Sincronizados: ${idsPendientes.join(", ")}`
      });
      return Promise.resolve(true);
    },
  
    obtenerLogs: async () => {
      // Ejemplo real:
      // const response = await axios.get('/api/asistencia/logs');
      // return response.data;
      return Promise.resolve([...logsMock]);
    },
  
    filtrarLogs: async (filtros) => {
      let data = [...logsMock];
      if (filtros.fechaInicio) {
        data = data.filter(
          (l) => new Date(l.fecha) >= new Date(filtros.fechaInicio)
        );
      }
      if (filtros.fechaFin) {
        data = data.filter(
          (l) => new Date(l.fecha) <= new Date(filtros.fechaFin)
        );
      }
      return Promise.resolve(data);
    }
  };
  