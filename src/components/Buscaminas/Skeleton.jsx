import styled, {keyframes} from "styled-components";
import VentanaContext from "./BuscaminasContext";
import { useContext } from "react";

const move = keyframes`
  0% {
    background-color: rgba(154, 155, 158, 0.69);
  }
  100% {
    opacity: .8;
    background-color: rgba(158, 158, 168, 0.53);
  }
`;

const SkeletonBoard = styled.div`
  padding: 30px;
  border-radius: 15px;
  background-color: rgba(230, 232, 236, 0.69);
  height: 80vh;  
  width: 80vh;
  animation: 1s  ${move} linear infinite alternate;
`;

const SkeletonTab = styled.div`
  width: 100%;
  height: 80px;
  border-radius: 15px;
  background-color: rgba(230, 232, 236, 0.69);
  animation: 1s ${move} linear infinite alternate;
`;

const SkeletonCells = styled.div`
    display: grid;
    grid-template-columns: repeat(${(props) => props.size}, 1fr);
    grid-template-rows: repeat(${(props) => props.size}, 1fr);
    height: 600px;
    margin-inline: 50px;
    margin-top: 30px;
`;

const SkeletonCell = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid rgb(255, 255, 255,0.3);
    background-color: rgba(230, 232, 236, 0.69);
    animation: 1s ${move} linear infinite alternate;
`;


export default function Skeleton(){
    const { tablero } = useContext(VentanaContext);
    return (
        <SkeletonBoard>
            <SkeletonTab/>
            <SkeletonCells size={tablero.size}>
                {tablero.gameBoard.map((fila, i) =>
                    fila.map((_, j) => (
                        <SkeletonCell key={`${i}-${j}`} />
                    ))
                )}
            </SkeletonCells> 
        </SkeletonBoard>
    );

}