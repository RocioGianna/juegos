import styled from "styled-components";

export const SelectStyled = styled.select`
border: 3px solid gray;
border-radius: 10px;

`;


export default function Select({children, value, onChange}) {
    return (
        <SelectStyled value={value} onChange={onChange}>
                {children}
        </SelectStyled>
)}