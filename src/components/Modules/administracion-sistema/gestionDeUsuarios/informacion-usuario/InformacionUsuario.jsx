import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "./InformacionUsuario.css";
import WorkIcon from '@mui/icons-material/Work';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SchoolIcon from '@mui/icons-material/School';
import InformacionLaboral from './InformacionLaboral';
import InformacionAcademica from './InformacionAcademica';
import InformacionBancaria from './InformacionBancaria';
import HojaDeServicio from './HojaDeServicio';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InformacionPersonal from './informacionPersonal';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const InformacionUsuario = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <div className='row'>
                <div className='col-sm-12 col-md-6'>
                    <p><b>RFC: </b><span>##########</span></p>
                    <p><b>Fecha de Ingreso: </b> <span>05/03/2020</span></p>
                    <p><b>Telefono: </b><span>55-5555-5555</span></p>
                    <p><b>Correo electrónico: </b><span>mhernandez@gmail.com</span></p>
                </div>
                <div className='col-sm-12 col-md-6'>
                    <p><b>Departamento: </b><span>Nominas</span></p>
                    <p><b>Puesto de trabajo:</b> <span>Rol o puesto</span></p>
                    <p><b>Gerente: </b><span><a href="#">Kevin Meneses</a></span></p>
                </div>
            </div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="Informacion del usuario" className='main-color-tab'>
                        <Tab label={
                            <div className='d-flex align-items-center'><AccountCircleIcon className='mx-2' /> Información Personal</div>
                        } {...a11yProps(0)} />
                        <Tab label={
                            <div className='d-flex align-items-center'><WorkIcon className='mx-2' /> Información laboral </div>
                        } {...a11yProps(1)} />
                        <Tab label={
                            <div className='d-flex align-items-center'><SchoolIcon className='mx-2' /> Información Académica</div>
                        } {...a11yProps(2)} />
                        <Tab label={
                            <div className='d-flex align-items-center'><ArticleOutlinedIcon className='mx-2' /> Hoja de Servicio </div>
                        } {...a11yProps(3)} />
                        <Tab label={
                            <div className='d-flex align-items-center'><CreditCardIcon className='mx-2' /> Información Bancaria </div>
                        } {...a11yProps(4)} />

                    </Tabs>
                </Box>
                
                <CustomTabPanel value={value} index={0}>
                    <InformacionPersonal />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <InformacionLaboral />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <InformacionAcademica/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <HojaDeServicio />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    <InformacionBancaria/>
                </CustomTabPanel>
            </Box>

        </div>
    )
}

export default InformacionUsuario