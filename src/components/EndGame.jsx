import styled from "styled-components";


export const Text = styled.h1`
  display: none;

  &.show{
    display: block;
    color: black;
  }
`;

export default function EndGame({children, ...props}){
    return (
        <Text {...props}>{children}</Text>

    );
}