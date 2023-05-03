import styled from "styled-components";

const Button = styled.button.attrs((props) => ({
  type: props.type || "button",
}))`
  display: block;
  margin: ${(props) => props.margin || "0"};
  background: ${(props) => props.background || "transparent"};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding || "8px 10px"};
  border: ${(props) => props.border || "1px solid #11111f"};
  border-radius: ${(props) => props.borderRadius || "5px"};
  outline: none;
  cursor: pointer;

  &:disabled {
    border: 1px solid #eee;
    background-color: #eee;
    color: #a1a1a1;
    box-shadow: none;
    cursor: auto;
    &:hover {
      box-shadow: none;
    }
  }
`;

export default Button;
