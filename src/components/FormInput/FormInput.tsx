import { FieldHookConfig, useField } from "formik";
import { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface CustomProps {
  label?: string;
}

type Props = CustomProps & FieldHookConfig<string>;

const FormInput: React.FC<Props> = (props) => {
  const [field, meta] = useField(props);
  return (
    <StyledWrapper>
      {props.label && (
        <FormLabel htmlFor={props.id || props.name}>{props.label}</FormLabel>
      )}
      <Input {...field} {...props} id={props.name} />
      {meta.touched && meta.error ? (
        <FormFeedback>meta.error</FormFeedback>
      ) : null}
    </StyledWrapper>
  );
};

export default FormInput;
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Input = styled.input`
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border-style: none;
  background-color: hsl(204 20% 94% / 0.4);
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  color: hsl(204 10% 10%);
  box-shadow: inset 0 0 0 1px rgba(0 0 0 / 0.1),
    inset 0 2px 5px 0 rgba(0 0 0 / 0.05);

  &:placeholder {
    color: hsl(204 10% 10% / 0.6);
  }

  &:hover {
    background-color: hsl(204 20% 94%);
  }

  &:focus-visible,
  &[data-focus-visible] {
    outline: 2px solid hsl(204 100% 40%);
    outline-offset: 0px;
  }
`;
const FormLabel = styled.label``;

const FormFeedback = styled.div``;
