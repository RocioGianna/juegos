import Card from "../compartidos/Card";
import  styled from "styled-components";
import RoundButton from "../compartidos/RoundButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import JuegosList from "./JuegosList";


const ContenidoStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    margin-top: 30px;
    color: white;
`;

const CardContainer = styled.div`
    display: flex;
    color: white;
`;


export default function home(){
    const isLogin = useSelector((state) => state.auth.user);
    return (
        <>
        {!isLogin && 
        <>
            <ContenidoStyle>
                <h1>Bienvenido a Mini Juegos</h1>
                <h2>Disfruta de nuestros juegos clásicos en una experiencia moderna</h2>
            </ContenidoStyle>
            <CardContainer>   
                <Card icono="🎮" titulo="Juegos Clásicos" descripcion="Revive los juegos clásicos con un toque moderno" />
                <Card icono="🎲" titulo="Compite" descripcion="Demuestra tus habilidades y alcanza nuevos récords" />
                <Card icono="🎯" titulo="Comunidad" descripcion="Únete a una comunidad activa de jugadores" />
            </CardContainer>
        </>}
        
        {isLogin && <JuegosList />}
        </>
    );
}