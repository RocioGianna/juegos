import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import logo from  '../../assets/espadas.png';
import login from '../../assets/perfil.png';
import logoutIcon from '../../assets/cerrar-sesion.png';
import userLogout from '../../assets/usuario.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const Nav = styled.nav`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  a {
    text-decoration: none;
    color: white;
  }
`;

const Icono = styled.img`
  height: 20px;
  margin-left: 10px;
`;


const Logo = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const IconosContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  gap: 20px;
`;



export default function Navegador(){
    const isLogin = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHanlder = ()=>{
      dispatch(logout());
      navigate("/");
    }

    return (
        <Nav>
          <Link to="/"> 
            <Logo>
              <Icono src={logo} alt="" /> 
              <span>MiniJuegos</span>
            </Logo> 
          </Link>

          <IconosContainer>
            {isLogin ?  
            <Link to="/perfil">
              <AccountCircleIcon fontSize="large" />
            </Link> : null}
            {isLogin? <Link onClick={logoutHanlder} to="/logout"><LogoutIcon fontSize="large" /></Link> : <Link to="/login"><LoginIcon fontSize="large" /></Link>}
          </IconosContainer>
        </Nav>
    );
}