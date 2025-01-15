import './App.css'
import Configuracion from './components/Configuracion';
import Tablero from './components/Tablero';
import { BuscaminasProvider } from './components/BuscaminasContext';
import styled from "styled-components";

export const BuscaminasStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border: 1px solid black;
  border-radius: 15px;
  background-color: white;
  height: 80vh;  
`;

function App() {
  return (
    <BuscaminasProvider>
      <BuscaminasStyle>
        <Configuracion />
        <Tablero />
      </BuscaminasStyle>
    </BuscaminasProvider>
  );
}

export default App
