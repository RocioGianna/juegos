import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../compartidos/Card';

const ListStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin:30px;
    flex-wrap: wrap;
  
    a {
        text-decoration: none;
        color: white;

        &:hover { 
            scale: 1.1;
        }
    }    
`;

const JUEGOS = [
    {id: "buscaminas", icono: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGVneWVtbm96ZXV1NWkyd2Y3bmcwc2puOXdwOTN2OTkwNHllNXU3ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3V0GQMoaDLVbjXEI/giphy_s.gif", titulo: "Buscaminas", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {id: "snake", icono: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExemZ4YTltN2dzaWlkZzBwZWw4Mm5yZ3ljZWc0OGNhMWE4NmczZGFuNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zPdwt79PXjMEo/giphy_s.gif", titulo: "Snake", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {id: "pinball", icono: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXllMHd5Y25kcDZ2cHVqaXAwdjF5OXV5Y3BlMnpkc2l5cjJlZHQ1eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sCSpuxEO8Kj9S/giphy_s.gif", titulo: "Pinball", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {id: "tetris", icono: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2xobnRrdTJ1dmF3aGM0dmJsYjRzaDhnZWpqMHpjNjNhdmRvZHc3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f7STAwvEml1eIf0FEq/giphy_s.gif", titulo: "Tetris", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {id: "sonic", icono: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTU2ZXptbGE0ZHIwNWRmbTZqOG81enpjam1mZ2F6YmRuc2NmZHM0biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZU54zyQ7OJQhW/giphy_s.gif", titulo: "Sonic", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {id: "poker", icono: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWcwMHRpNG8wbmR6N2F2emV2OTFwaTB6a3d3b2c3ZXRqeDFib3owNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bubpLP4o75fmIVukRr/giphy_s.gif", titulo: "Poker", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
]


export default function JuegosList(){
    return(
        <ListStyle>
            {JUEGOS.map((juego)=>{
                return (
                    <Link key={juego.id} to={`/juegos/${juego.id}`}>
                        <Card icono={juego.icono} titulo={juego.titulo} descripcion={juego.descripcion} />    
                    </Link>
                )
            })}
        </ListStyle>
    )
};