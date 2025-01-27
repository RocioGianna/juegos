import Card from "../components/compartidos/Card";
import { HardHat, Hammer, Construction } from 'lucide-react';
import styled, { keyframes } from "styled-components";
import { useLocation } from 'react-router-dom';


const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    border-radius: 15px;
    background-color: rgba(80, 79, 79, 0.73);
    color: white;
    height: 50vh;
    margin-top: 60px;
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(40deg);
  }
`;


const AnimatedHardHat = styled(HardHat)`
  animation: ${bounce} 1s infinite;
`;

const AnimatedHammer = styled(Hammer)`
  animation: ${rotate} 2s linear infinite;
`;

export default function NotFoundPage(){
    const location = useLocation();
    const notFound = location.state == null;

    const icono = ()=>{
        if(notFound) return (
            <>
            <AnimatedHardHat size={70} color="yellow" />
            <AnimatedHammer size={70} color="gray" />
            </>
        )
        else return <Construction size={70} color="red" />
    }
    const titulo = notFound? "404" : location.state.code;
    const descripcion = notFound? "El juego aún no está disponible. ¡Pronto podrás disfrutarlo!" : location.state.message;
    return (
        <CardContainer>
            <Card icono={icono()} titulo={`Error ${titulo}`} descripcion={descripcion}/>
        </CardContainer>
    )
}