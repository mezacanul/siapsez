import {
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    key: '1000',
    icon: <DesktopOutlined />,
    label: 'Administración del sistema',
    route: '/dashboard',
    children: [
      {
        key: '1001',
        label: 'Filiación',
        route: '/filiacion'
      },
      {
        key: '1002',
        label: 'Organigrama',
        route: '/organigrama'
      }
    ],
  },
  {
    key: '2000',
    icon: <ContainerOutlined />,
    label: 'Gestión de Plazas',
    route: '/plazas-estatales',
    children: [
      {
        key: '2001',
        label: 'Gestión de centros',
        children: [
          { key: '2101', label: 'Escuelas', route: '/centros-de-trabajo' },
          { key: '2102', label: 'Tipos de centros de trabajo', route: '/tipos-centros-de-trabajo' },
        ],
      },
      {
        key: '2002',
        label: 'Inventario de plazas',
        route: '/inventarioDePlazas'
      },
      {
        key: '2003',
        label: 'Proyección de escenarios de nómina',
        route: '/ProyeccionDeEscenariosDeNomina'
      },
      {
        key: '2004',
        label: 'Formato único de personal estatal',
        route: '/formato-unico-de-personal-estatal'
      },
      {
        key: '2005',
        label: 'Control de Plazas Presupuestales',
        route: '/ControlDePlazasPresupuestales'
      },
      {
        key: '2006',
        label: 'Catalogos',
        route: '/plazas-catalogos'
      }
    ],
  },
  {
    key: '3000',
    icon: <ContainerOutlined />,
    label: 'Nomina',
    route: '/menu-nomina',
    children: [
      {
        key: '3001',
        label: 'Catalogos',
        children: [
          { key: '3101', label: 'Tipo Percepciones', route: '/tipos-de-percepcion' },
          { key: '3102', label: 'Tipos Deducciones', route: '/tipos-de-deduccion' },
          { key: '3103', label: 'Claves Internas Percepciones', route: '/clave-interna-percepcion' },
          { key: '3104', label: 'Claves Internas Deducciones', route: '/clave-interna-deduccion' },
          { key: '3105', label: 'Concepto Percepciones', route: '/concepto-percepciones' },
          { key: '3106', label: 'Concepto Deducciones', route: '/concepto-deducciones' },
        ],
      },
      {
        key: '3002',
        label: 'Cat 2 Nomina',
        route: '/inventarioDePlazas'
      }
    ],
  }
];

// eslint-disable-next-line react/prop-types
const Sidebar = ({ collapsed, onCollapseToggle }) => {
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    // Recuperamos el estado abierto desde el almacenamiento local
    const savedOpenKeys = JSON.parse(localStorage.getItem('openKeys')) || [];
    setOpenKeys(savedOpenKeys);
  }, []);

  const handleClick = (e) => {
    // Buscamos el item que coincide con el key seleccionado
    const selectedItem = findItemByKey(items, e.key);
    if (selectedItem && selectedItem.route) {
      navigate(selectedItem.route); // Navega a la ruta especificada en el item
    }
  };

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
    // Guardamos el estado abierto en el almacenamiento local
    localStorage.setItem('openKeys', JSON.stringify(keys));
  };

  // Función recursiva para encontrar el item por key, incluso en los hijos
  const findItemByKey = (menuItems, key) => {
    for (let item of menuItems) {
      if (item.key === key) {
        return item;
      }
      if (item.children) {
        const foundChild = findItemByKey(item.children, key);
        if (foundChild) {
          return foundChild;
        }
      }
    }
    return null;
  };

  return (
    <div className='sidebar'>
      <div className='w-100 px-1 d-flex justify-content-center'>
        <Button
            className={`collapse-btn ${collapsed ? 'collapsed' : ''}`}
            type="text"
            onClick={onCollapseToggle}
            style={{ color: 'white', marginLeft: 'auto' }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <Menu className={`menu-bar ${collapsed ? 'collapsed' : ''}`}
        openKeys={openKeys} // Estado abierto persistente
        onOpenChange={handleOpenChange} // Guardamos el estado abierto en el almacenamiento local
        mode='inline'
        items={items}
        onClick={handleClick} // Agrega el evento onClick
        inlineCollapsed={collapsed}
      />
    </div>
  )
}

export default Sidebar