import styled from "styled-components";

const CardStyle = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 30px;
    border-radius: 15px;
    background-color: rgba(80, 79, 79, 0.86);
    margin: 30px;
    flex: 1;
    min-width: 300px;
`;

const IconStyle = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  background: ${(props) =>
    props.$isUrl
      ? `url(${props.$url}) center/cover no-repeat`
      : "transparent"};

  &:hover {
    background: ${(props) =>
      props.$isUrl
        ? `url(${props.$animatedUrl}) center/cover no-repeat`
        : "transparent"};
  }
`;


export default function Card({icono, titulo, descripcion}){
    const isUrl = typeof icono === "string" && icono.startsWith("http");
    const updatedUrl = isUrl ? icono.replace("_s.gif", ".gif") : null;

    return (
        <CardStyle >
            <IconStyle $isUrl={isUrl} $url={icono} $animatedUrl={updatedUrl}>
                {!isUrl && icono}
            </IconStyle>

            <h2>{titulo}</h2>
            <h3>{descripcion}</h3>
        </CardStyle>
    );
}