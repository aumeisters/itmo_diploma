import styled from "styled-components";

export const FormLabel = styled.label`
  display: block;
  margin: 1rem 0rem 0.5rem;
`;

export const FieldInput = styled.input<{
  $hasChildren: boolean,
}>`
  padding: 0.5rem;
  width: 100%;
  margin-right: ${(props) => props.$hasChildren ? '-3rem' : '0'};
  padding-right: ${(props) => props.$hasChildren ? '0' : '0.5rem'};
  font-size: 1rem;
`;

export const FieldTextArea = styled.textarea<{
  $height?: number,
}>`
  padding: 0.5rem;
  width: 100%;
  font-size: 1rem;
  resize: none;
  ${(props) => props.$height && `height: ${props.$height}rem;`};
`;

export const FieldTextAreaLength = styled.p`
  text-align: right;
  font-size: 1rem;
`;