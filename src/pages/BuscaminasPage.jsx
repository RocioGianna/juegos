import { BuscaminasProvider } from '../components/Buscaminas/BuscaminasContext';
import Configuracion from '../components/Buscaminas/Configuracion';
import Tablero from '../components/Buscaminas/Tablero';
import styled from "styled-components";
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from 'react';

import Skeleton from '../components/Buscaminas/Skeleton';


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
  width: 80vh;
`;

export default function BuscaminasPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (
        <BuscaminasProvider>
            {loading ? <Skeleton/> :  
                <BuscaminasStyle>
                    <Configuracion />
                    <Tablero />
                </BuscaminasStyle>
            }
        </BuscaminasProvider>
    );
}