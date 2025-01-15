import { useContext, useState } from "react";

import Timer from "./Timer";
import styled from "styled-components";
import VentanaContext from "./BuscaminasContext";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import RoundButton from "./compartidos/RoundButton";
import Select from "./compartidos/Select";
import FlagIcon from '@mui/icons-material/Flag';

export const ConfiguracionStyle = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 15px;
  background-color: rgba(195, 197, 201, 0.69);
  padding: 10px;

  
  & button{
    border: none;
    background: none;
    padding: 5px;
    cursor: pointer;
    border-radius: 10px;
  }

  & button:hover{
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }

  `;

export default function Configuracion() {
    const [selectedNivelValue, setSelectedNivelValue] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const tamaños = [8, 12, 16];

    const {gameState, dispatch, tablero, setTableroDispatch, restartState, restartStateDispatcher} = useContext(VentanaContext);

    function handleSize(event){
        let newSize= Number(event.target.value)
        setSelectedValue(newSize);
        setTableroDispatch(
            {
                type: "UPDATE_TABLERO", 
                payload: {
                    size: newSize, 
                    flags: Math.round(newSize * newSize * tablero.dificultadMinas[tablero.nivel]),
                    minas: Math.round(newSize * newSize * tablero.dificultadMinas[tablero.nivel]), 
                    gameBoard: [],
                    cellState: Array.from({ length: newSize }, () => Array(newSize).fill({flag:false, clicked:false}))
                }
            }
        );
    }

    function handleNivel(event){
        let newNivel= event.target.value
        setSelectedNivelValue(newNivel);
        setTableroDispatch(
            {
                type: "UPDATE_TABLERO",
                payload: {
                    nivel: newNivel,
                    flags: Math.round(tablero.size * tablero.size * tablero.dificultadMinas[newNivel]),
                    minas: tablero.size * tablero.size * tablero.dificultadMinas[newNivel],
                    gameBoard: [],
                    cellState: Array.from({ length: tablero.size }, () => Array(tablero.size).fill({flag:false, clicked:false}))
                }
            }
        );
    }

    const handleRestart = ()=>{
        dispatch({type: "RESTART"})
        if (restartState.win){
            restartStateDispatcher({type: "WIN"});
        }
        if (restartState.lose){
            restartStateDispatcher({type: "LOSE"});
        }

        setTableroDispatch(
            {
                type: "UPDATE_TABLERO",
                payload: { 
                    flags: Math.round(tablero.size * tablero.size * tablero.dificultadMinas[tablero.nivel]),
                    gameBoard: Array.from({ length: 8 }, () => Array(8).fill(0)),
                    cellState: Array.from({ length: tablero.size }, () => Array(tablero.size).fill({flag:false, clicked:false, minas: false}))
                }
            }
        );
    }

  return (
    <ConfiguracionStyle>
            <Select value={selectedNivelValue} onChange={handleNivel}>
                {Object.keys(tablero.dificultadMinas).map((nivel) => (
                    <option disabled={gameState.start || gameState.stop} key={nivel}  value={nivel}>
                        {nivel}
                    </option>
                ))}
            </Select>

            <Select onChange={handleSize} value={selectedValue}>
                {tamaños.map((tamano, _) => (
                    <option disabled={gameState.start || gameState.stop} key={tamano} value={tamano}>
                        {tamano + " x " + tamano}
                    </option>
                ))}
            </Select>

            <Timer />

            <p>{tablero.flags} <FlagIcon fontSize="small"/></p>
                 

            <RoundButton onClick={()=>{gameState.start ? dispatch({type: "STOP"}) : dispatch({type: "START"})}}>
                {!gameState.start && <PlayArrowIcon fontSize="small" />}
                {gameState.start && <PauseIcon fontSize="small" />}
            </RoundButton>

            <RoundButton onClick={handleRestart}>
                <RestartAltIcon fontSize="small"/>
            </RoundButton>
    </ConfiguracionStyle>
  )}; 