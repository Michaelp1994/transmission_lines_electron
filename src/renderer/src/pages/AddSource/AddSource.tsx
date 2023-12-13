import styled from "styled-components";
import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { useAppDispatch } from "@/store";
import { addSource } from "@/store/SourcesSlice";
import BaseButton from "@/components/BaseButton";
import FormInput from "@/components/FormInput";
import { Link, useNavigate } from "react-router-dom";

interface Props {}

const AddSource: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    phases: 3,
    voltage: 138,
    x1r1: 4,
    Isc1: 4000,
    Isc3: 3000,
    x0r0: 3,
    resistance: 15,
    frequency: 60,
  };
  function handleSubmit(
    values: SourceInput,
    actions: FormikHelpers<SourceInput>
  ) {
    dispatch(addSource(values));
    actions.resetForm();
    navigate("/");
  }
  function handleCancel(
    values: SourceInput,
    actions: FormikHelpers<SourceInput>
  ) {
    //
  }
  return (
    <Wrapper>
      <Link to="/">Go Back</Link>
      <Heading>Add Source</Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onReset={handleCancel}
      >
        <StyledForm>
          <FormInput
            label="Name"
            name="name"
            autoComplete="off"
            type="text"
            placeholder="Example"
            required
          />
          <FormInput
            label="Phases"
            name="phases"
            type="text"
            placeholder="3"
            required
          />
          <FormInput
            label="Voltage (kv)"
            name="voltage"
            type="number"
            placeholder="138"
          />
          <FormInput label="X1/R1" name="x1r1" type="number" placeholder="4" />
          <FormInput label="X0/R0" name="x0r0" type="number" placeholder="3" />
          <FormInput
            label="Short Circuit Current 3 Phase"
            name="isc3"
            type="number"
            placeholder="4000"
          />
          <FormInput
            label="Short Circuit Current 1 Phase"
            name="isc1"
            type="number"
            placeholder="3000"
          />
          <FormInput
            label="Resistance"
            name="resistance"
            type="number"
            placeholder="15"
          />
          <ButtonWrapper>
            <BaseButton type="reset">Cancel</BaseButton>
            <BaseButton type="submit">Save Changes</BaseButton>
          </ButtonWrapper>
        </StyledForm>
      </Formik>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
const Heading = styled.h1`
  font-size: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: end;
`;
export default AddSource;
