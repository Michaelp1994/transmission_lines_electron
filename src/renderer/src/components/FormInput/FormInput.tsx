/* eslint-disable react/jsx-props-no-spreading */
import { FieldHookConfig, useField } from "formik";
import styled from "styled-components";
// import { FormLabel, Input } from "component-library";

interface CustomProps {
    label?: string | React.ReactNode;
}

type Props = CustomProps & FieldHookConfig<HTMLInputElement>;

const FormInput: React.FC<Props> = ({
    label,
    id,
    name,
    ref,
    ...otherProps
}) => {
    const [field, meta] = useField({ id, name, ...otherProps });
    return (
        <StyledWrapper>
            {label && <FormLabel htmlFor={id || name}>{label}</FormLabel>}
            <Input {...field} {...{ id, name, ...otherProps }} id={name} />
            {meta.touched && meta.error ? (
                <FormFeedback>{meta.error}</FormFeedback>
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
    box-shadow:
        inset 0 0 0 1px rgba(0 0 0 / 0.1),
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
