import { useEffect, useState, useContext } from "react";
import VentanaContext from "./BuscaminasContext";
import styled from "styled-components";

export const TimerStyle = styled.div`
  width: auto;
  padding: 10px 0;
`;

export default function Timer() {
    const [segundos, setSegundos] = useState(0);
    const {gameState, dispatch} = useContext(VentanaContext);

    let timer;
    useEffect(() => {
        if (gameState.start) {
            timer = setInterval(() => {
                setSegundos((prevSegundos) => prevSegundos + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameState.start]);

    useEffect(() => {
        if (gameState.restart){
            setSegundos(0);
            clearInterval(timer);
            dispatch({type: "RESTART"});
        } 
    }, [gameState.restart]);


    useEffect(() => {
        if (gameState.stop){
            dispatch({type: "STOP"});
            clearInterval(timer);
        } 
    }, [gameState.stop]);

    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;

    return (
        <>
            <TimerStyle>{minutos <10 ? "0" + minutos : minutos}:{segundosRestantes < 10 ? "0" + segundosRestantes : segundosRestantes}</TimerStyle>
        </>
    );
}