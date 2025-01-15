import {createContext, useReducer } from "react";


const BuscaminasContext = createContext();

export const BuscaminasProvider = ({ children }) => {

    const tableroInitialState = {
        flags: Math.round(8 * 8 * 0.2),
        cellState: Array.from({ length: 8 }, () => Array(8).fill({flag:false, clicked:false, mina: false})),
        size: 8,
        nivel: "Facil",
        minas: Math.round(8 * 8 * 0.2),
        gameBoard: Array.from({ length: 8 }, () => Array(8).fill(0)),
        dificultadMinas: {
            Facil: 0.2,
            Medio: 0.4,
            Dificil: 0.6
        }
    };

    function tableroReducer(state, action){
        switch(action.type){
            case "UPDATE_TABLERO":
                return {...state, ...action.payload};
            default:
                return state;
        }
    }

    const initialState = {
        start: false,
        restart: false,
        stop: false
    }

    function gameStateRedurcer(state, action){
        switch(action.type){
            case "START":
                return {...state, start: true, stop: false, restart: false};
            case "RESTART":
                return {...state, restart: true, stop: false, start: false};
            case "STOP":
                return {...state, stop: true, restart: false, start: false};
            default:
                return state;
        }
    }

    const restart = {
        lose: false,
        win:false
    }

    function restartStateReducer(state, action){
        switch(action.type){
            case "LOSE":
                return {...state, lose: !state.lose};
            case "WIN":
                return {...state, win: !state.win};
            default:
                return state;
        }
    }

    const [gameState, dispatch] = useReducer(gameStateRedurcer, initialState);
    const [tablero, setTableroDispatch] = useReducer(tableroReducer, tableroInitialState);
    const [restartState, restartStateDispatcher] = useReducer(restartStateReducer, restart);

  

    return (
        <BuscaminasContext.Provider value={{tablero, setTableroDispatch, gameState, dispatch, restartState, restartStateDispatcher}}>
            {children}
        </BuscaminasContext.Provider>
    );
};

export default BuscaminasContext;









