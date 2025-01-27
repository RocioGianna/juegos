import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from "../../redux/authSlice";

const BackgroundStyle = styled.div`
    height: 50vh;
    display: flex; 
    justify-content: center;
    align-items: center;
`;


const LoginCard = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  border-radius: 15px;
  width: 400px;
  background-color: rgba(80, 79, 79, 0.89);
  box-shadow: 
    0 0 10px #00bfff, 
    0 0 20px #00bfff, 
    0 0 30px #00bfff, 
    0 0 40px #1e90ff, 
    0 0 50px #1e90ff;
  animation: 1.5s neonGlow infinite alternate;

  @keyframes neonGlow {
    0% {
      box-shadow: 
        0 0 10px #00bfff, 
        0 0 20px #00bfff, 
        0 0 30px #00bfff, 
        0 0 40px #1e90ff, 
        0 0 50px #1e90ff;
    }
    100% {
      box-shadow: 
        0 0 20px #1e90ff, 
        0 0 30px #1e90ff, 
        0 0 60px #1e90ff, 
        0 0 70px #4682b4, 
        0 0 80px #4682b4;
    }
  } 
`;

const Button = styled.button`

    margin-top: 20px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(196, 167, 167, 0.56);
    border: none;
    cursor: pointer;
    box-shadow: 0px 0px 10px #ff0077;
    transition: all 0.3s ease;
    color: white;
    font-size: 20px;
    font-weight: bold;

    &:hover {
        background-color: #ff4da6;
        box-shadow: 0px 0px 20px #ff4da6;
        scale: 1.1;
    }

`;

const Label = styled.label`
    color: #00bfff;
    font-size: 20px;
    text-shadow: 0 0 5px #1e90ff, 0 0 10px #1e90ff;
    margin-bottom: 5px;
    margin-top: 10px;
    transition: color 0.3s ease, text-shadow 0.3s ease;
`;

const Input = styled.input`
    background-color: #222;
    color: #fff;
    border: 1px solid #555;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
    box-shadow: 0px 0px 5px #555 inset;
    font-size: 16px;

    &:focus {
        outline: none;
        border-color: #00ffff;
        box-shadow: 0px 0px 10px #00ffff inset;
    }
`;

export default function LoginInput(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const authData = {
        email: formData.get('email'),
        password: formData.get('password'),
        };

        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(authData)
        });
        
        if (!response.ok) {
            console.log(response.message, response.status);
            navigate('/error', { state: { code: response.status, message: "Ocurrio un error. Las credenciales son incorrectas." } });
            return;
        }
        
        const resData = (await response.json()).data;
        dispatch(loginSuccess({ user: resData.usuario, token: resData.token }));
            
        navigate('/');
    };


    return (
        <BackgroundStyle>
            <LoginCard onSubmit={handleSubmit}>
                <Label htmlFor="email">Email</Label>
                <Input type="text" name="email" placeholder="email" required />
                <Label htmlFor="password">Password</Label>
                <Input type="password" name="password" placeholder="password" required />
                <Button>Login</Button>
            </LoginCard>
        </BackgroundStyle>
    );
}

