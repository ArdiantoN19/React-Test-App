import styled from "styled-components";

const Input = styled.input.attrs((props) => ({
  type: props.type || "text",
}))`
  padding: ${(props) => props.padding || "6px 10px"};
  outline: none;
  color: ${(props) => props.color || "#11111f"};
  background: ${(props) => props.background || "transparent"};
  border: ${(props) => props.border || "1px solid #11111f"};
  border-radius: ${(props) => props.borderRadius || "1px solid #11111f"};
`;

export default Input;
