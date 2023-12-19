/* eslint-disable react/jsx-props-no-spreading */
import { FieldHookConfig, useField } from "formik";
import styled from "styled-components";

interface MyProps {
    label?: string;
    name: string;
    id?: string;
    children: React.ReactNode;
}

type Props = MyProps & FieldHookConfig<string>;

const FormSelect: React.FC<Props> = ({ label, id, name, ...otherProps }) => {
    const [field, meta] = useField({ id, name, ...otherProps });
    return (
        <StyledWrapper>
            {label && <FormLabel htmlFor={id || name}>{label}</FormLabel>}

            <Select {...field} {...{ id, name, ...otherProps }} />
            {meta.touched && meta.error ? (
                <FormFeedback>{meta.error}</FormFeedback>
            ) : null}
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
const Select = styled.select`
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

export default FormSelect;
