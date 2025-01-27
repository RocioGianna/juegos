import { Outlet } from "react-router-dom";
import Navegador from "../components/Home/Navegador";
import styled from "styled-components";

const LayoutStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export default function Layout(){
    return (
        <LayoutStyle>
            <Navegador/>
            <Outlet/>
        </LayoutStyle>
    );
}