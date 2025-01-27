import { useSelector } from "react-redux";
import styled from "styled-components";
import RestoreIcon from '@mui/icons-material/Restore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import Card from '../components/compartidos/Card';

const PerfilStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    border-radius: 15px;
    background-color: rgba(80, 79, 79, 0.73);
    color: white;
`;

const CardContainer = styled.div`
    display: flex;
    width: 100%;
`;

export default function Perfil(){
    const user = useSelector((state) => state.auth.user);
    console.log(user);
    return (
        <PerfilStyle>
            <h1>Icono</h1>
            <h1>Player {user.name}</h1>
            <h3>{user.email}</h3>
            <CardContainer>
                <Card icono={<RestoreIcon fontSize="large" />} titulo="Last Game Played" descripcion={user.lastGame} />
                <Card icono={<MilitaryTechIcon fontSize="large"/>} titulo="Game Score" descripcion={user.lastScore} />
                <Card icono={<AccessTimeIcon fontSize="large"/>} titulo="Total Hours Played" descripcion={user.playedHours} />
            </CardContainer>
        </PerfilStyle>
    );
}