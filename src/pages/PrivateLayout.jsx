import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const LayoutStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export default function PrivateLayout(){
    const isLogin = useSelector((state) => state.auth.user);
    return (
        <LayoutStyle>
            {isLogin ? <Outlet/> : <Navigate to="/login" />}
        </LayoutStyle>
    );
}