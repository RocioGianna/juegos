import styled from "styled-components";


const Button =  styled.button`
    border: none;
    background: none;
    padding: 5px;
    cursor: pointer;
    border-radius: 10px;

  &:hover{
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }
  
  a{
    text-decoration: none;
    color: #333;
  }

`;


export default function RoundButton({children, onClick, ...props}) {
    return (
        <Button {...props} onClick={onClick}>{children}</Button>
    )}
