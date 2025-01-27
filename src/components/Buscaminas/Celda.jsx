import styled from "styled-components";

export const Button = styled.button`
  border: 1px solid gray;
  background-color: rgba(245, 245, 243, 0.69);
  cursor: pointer;
  font-size: 30px;

  &:hover{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }

  &.clear{
    color: transparent;
  }

  &.bomb-near{
    background-color: hsla(54, 86.60%, 56.10%, 0.20);
  }

  &.bomb{
    color: red;
    background-color: hsla(0, 83.50%, 59.60%, 0.20);
  }

  &.empty{
   color: transparent;
   background-color: hsla(0, 0%, 0%, 0.20);
  }

  &.flag{
    color: green;
    background-color: hsla(103, 74.90%, 65.70%, 0.20);
  }

  `;

export default function Celda({children, ...props}) {
  return (
    <Button {...props}>{children}</Button>
  )};