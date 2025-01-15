import { useContext, useEffect } from "react";
import Celda from "./Celda";
import VentanaContext from "./BuscaminasContext";
import styled from "styled-components";
import IconoBomba from "./compartidos/IconoBomba";
import Text from "./EndGame";
import FlagIcon from '@mui/icons-material/Flag';

export const TableroContainer = styled.div`
  aspect-ratio: 1 / 1;
  display: grid;
  grid-template-columns: repeat(${(props) => props.size}, 1fr);
  grid-template-rows: repeat(${(props) => props.size}, 1fr);
  width: auto;
  height: 100%;
  border: 3px solid gray;
  margin-top: 20px;
`;

export default function Tablero() {
    const {gameState, dispatch, tablero, setTableroDispatch, restartState, restartStateDispatcher} = useContext(VentanaContext);
    const MAX_SIZE = tablero.size;

    const colocarMinas = (numMinas) => {
        let board = Array.from({ length: MAX_SIZE }, () => Array(MAX_SIZE).fill(0));
        let minasColocadas = 0;
        while (minasColocadas < numMinas) {
          const fila = Math.floor(Math.random() * (MAX_SIZE -1));
          const columna = Math.floor(Math.random() * (MAX_SIZE -1));
          if (board[fila][columna] !== -1) {
              board[fila][columna] = -1; 
              tablero.cellState[fila][columna].mina = true;
              setCantidadBombasSector(board, fila, columna);
              minasColocadas++;
            }
        }
        return board;
      };

    function setCantidadBombasSector(board, fila, columna){
        for (let i = fila-1; i <= fila+1; i++) {
            for (let j = columna-1; j <= columna+1; j++) {
                if ((i < MAX_SIZE && i >= 0) && (j < MAX_SIZE && j >= 0) && board[i][j] !== -1){
                    board[i][j] += 1;
                }
            }
        }
    }

    useEffect(() => {
        setTableroDispatch({
            type: "UPDATE_TABLERO",
            payload: {
                gameBoard: colocarMinas(tablero.minas)
            }
        })
    }, [tablero.minas, tablero.size, tablero.nivel, gameState.restart]);


    const handleClick = (i, j) =>{
        const updatedCellState = tablero.cellState.map(row => row.map(cell => ({ ...cell })));
        updatedCellState[i][j].clicked = true;
        
        if(updatedCellState[i][j].flag) {return};

        if(tablero.gameBoard[i][j] === -1){
            restartStateDispatcher({type: "LOSE"});
            dispatch({ type: "STOP"});
        }
        
        if (tablero.gameBoard[i][j] === 0 ){
            descubrirCeldas(i, j, updatedCellState); 
        }

        setTableroDispatch({
            type: "UPDATE_TABLERO", 
            payload: {
                cellState: updatedCellState,
        }});

        winModal();
        
    }

    function descubrirCeldas(i, j, updatedCellState) {
        if (tablero.cellState[i][j].flag || tablero.gameBoard[i][j] === -1) {return}

        updatedCellState[i][j].clicked = true;
        
        if (tablero.gameBoard[i][j] === 0){
            
            for(let x= i-1; x <= i+1; x++ ){
                for(let y=j-1; y <= j+1; y++){
                    if (x >= 0 && x < MAX_SIZE && y >= 0 && y < MAX_SIZE){
                        if(!(x == i && y == j) && !updatedCellState[x][y].clicked){
                            updatedCellState[x][y].clicked = true;
                            descubrirCeldas(x, y, updatedCellState); 
                        }
                    }
                }
            }
        }
    }

    const handleClickDerecho = (event, i, j) => {
        event.preventDefault();
        const updatedCellState = tablero.cellState.map(row => row.map(cell => ({ ...cell })));

        if (updatedCellState[i][j].clicked) {return}

        updatedCellState[i][j].flag = !updatedCellState[i][j].flag;
        setTableroDispatch({
            type: "UPDATE_TABLERO", 
            payload: {
                flags: updatedCellState[i][j].flag ? tablero.flags - 1 : tablero.flags + 1, 
                cellState: updatedCellState,
            }})
    };

    const winModal = () =>{
        let cont = (tablero.size * tablero.size) - tablero.minas;
        for(let i=0; i<MAX_SIZE; i++) {
            for(let j=0; j<MAX_SIZE; j++){
                console.log(cont);
                if(cont == 0){
                    restartStateDispatcher({type: "WIN"});
                    dispatch({ type: "STOP"});
                    return
                }

                if (tablero.cellState[i][j].clicked && tablero.gameBoard[i][j] === -1){
                    return
                }
                if(tablero.cellState[i][j].clicked && tablero.gameBoard[i][j] !== -1){
                    cont--;
                }
            }
        }
        //restartStateDispatcher({type: "WIN"});
        //dispatch({ type: "STOP"});
        
    };

    const handleClassName = (celda, i, j)=>{ 
        
        const hasFlag = tablero.cellState[i][j].flag;
        const isClicked = tablero.cellState[i][j].clicked;

        if (isClicked && celda === -1 && !hasFlag || restartState.lose && celda === -1){
            return "bomb";
        }else if (isClicked && celda === 0  && !hasFlag){
            return "empty";
        }else if (isClicked && celda > 0  && !hasFlag){
            return "bomb-near";
        }else if(hasFlag && !isClicked){
            return "flag";
        }else{
            return "clear";
        }
    }


    return (
        <>
        <TableroContainer size={MAX_SIZE}>
            {tablero.gameBoard.map((fila, i) =>
                fila.map((celda, j) => (
                <Celda 
                key={i + "," + j} id={i + "," + j} 
                onClick={gameState.start ? () => handleClick(i, j) : null} 
                onContextMenu={(event) => {handleClickDerecho(event,i,j)}} 
                className={`${handleClassName(celda, i, j)}`}>

                {tablero.cellState[i][j].flag ? <FlagIcon fontSize="small"/> :
                    (celda === -1 ? <IconoBomba /> : celda)}

                </Celda>
                ))
            )}
        </TableroContainer>

        <Text className={restartState.lose ? "show" : ""}>Perdiste :c</Text>
        <Text className={restartState.win ? "show" : ""}>Ganaste! :D </Text>
        </>
  )};