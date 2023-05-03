import styled from "styled-components";

const Badge = styled.span`
  padding: ${(props) => props.padding || "8px 12px"};
  color: ${(props) => props.color || "#11111f"};
  background-color: ${(props) => props.backgroundColor || "#f0a967"};
  border: none;
  border-radius: ${(props) => props.borderRadius || "5px"};
`;

export default Badge;
