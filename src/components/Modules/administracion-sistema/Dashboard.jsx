import Layout from "../../Layout"
import './dashboard.css'
import Card from '../../utilities/card/Card'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArticleIcon from '@mui/icons-material/Article';
import MapIcon from '@mui/icons-material/Map';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Table from "../../utilities/table/Table";
import Calendario from "../../utilities/calendario/Calendario";
import Uploader from "../../utilities/uploader/Uploader";
import Form from "../../utilities/form/Form";
import CustomModal from "../../utilities/modal/CustomModal";
import { useNavigate } from 'react-router-dom';
import data from '../../../assets/MOCK_DATA.json'

const Dashboard = () => {
  const navigate = useNavigate();
  const horario = [
    {
      titulo: "Matemáticas 3°",
      tipo: "recurrente",
      horario: [
        { diaSemana: 1, horaInicio: 13, duracionHoras: 1.5 },
        { diaSemana: 2, horaInicio: 17, duracionHoras: 2 },
        { diaSemana: 4, horaInicio: 13, duracionHoras: 2 },
      ],
    },
  ];
  const diasFestivos = [
    {
      start: new Date("2024-10-10T00:00:00"),
      end: new Date("2024-10-10T23:59:59"),
      title: "Día Festivo",
      color: "#FFD700",
    },
  ];
  const usuario = [
    {
      nombre: "Prueba",
      apellidoPaterno: "Prueba",
      apellidoMaterno: "Prueba",
      email: "example@example.com",
      rfc: "Prueba"
    },
  ];

  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
      filterFn: 'includesString',
    },
    {
      header: 'Nombre',
      accessorKey: 'first_name',
      filterFn: 'includesString',
    },
    {
      header: 'Apellido',
      accessorKey: 'last_name',
      filterFn: 'includesString',
    },
    {
      header: 'Email',
      accessorKey: 'email',
      filterFn: 'includesString',
    },
    {
      header: 'Puesto',
      accessorKey: 'job_title',
      filterFn: 'includesString',
    },
  ];


  return (
    <>
      <Card title="Administración del sistema">
        <div className="d-flex justify-content-between flex-wrap">
          <div className="dashboard-option" onClick={() => navigate('/gestion-de-usuarios')}>
            <PeopleAltIcon
              style={{ fontSize: 46, color: "var(--dark-blue)" }}
            />{" "}
            <p>Gestión de empleados</p>
          </div>
          <div className="dashboard-option">
            <ArticleIcon style={{ fontSize: 46, color: "var(--pink)" }} />{" "}
            <p>Opcion 2</p>
          </div>
          <div className="dashboard-option">
            <MapIcon style={{ fontSize: 46, color: "var(--light-blue)" }} />{" "}
            <p>Opcion 3</p>
          </div>
          <div className="dashboard-option">
            <SchoolIcon style={{ fontSize: 46, color: "var(--green)" }} />{" "}
            <p>Opcion 4</p>
          </div>
          <div className="dashboard-option">
            <CodeIcon style={{ fontSize: 46, color: "var(--dark-blue)" }} />{" "}
            <p>Opcion 5</p>
          </div>
          <div className="dashboard-option">
            <ReceiptIcon style={{ fontSize: 46, color: "var(--yellow)" }} />{" "}
            <p>Opcion 6</p>
          </div>
        </div>
      </Card>
      <Card title='Ejemplo Tabla'>
        <Table data={data} columns={columns}/>
      </Card>
      <Card title="Calendario semanal">
        <Calendario
          semanaLunesAViernes={true}
          vistaSemanal={true}
          horario={horario}
          diasFestivos={diasFestivos}
          fechaInicio="2024-09-01"
          fechaFin="2024-12-31"
        />
      </Card>
      <Card title="Calendario mensual">
        <Calendario
          semanaLaboral={true}
          vistaMensual={true}
          diasFestivos={diasFestivos}
        />
      </Card>
      <Card title="Cargador de archivos">
        <Uploader/>
      </Card>
      <Card title="Formulario">
        <Form/>
      </Card>
      <Card title="Modal">
        <CustomModal title={"Crear formulario"} messageButton={"Crear formulario"}>
        <Form />
        </CustomModal>
        <CustomModal title={"Editar formulario"} messageButton={"Editar formulario"}>
        <Form data={usuario[0]}/>
        </CustomModal>
      </Card>
    </>
  );
};

export default Dashboard;
