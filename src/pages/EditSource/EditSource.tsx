import styled from "styled-components";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import FormInput from "@/components/FormInput";
import { updateSource } from "@/store/SourcesSlice";
import { Form, Formik, FormikHelpers } from "formik";
import BaseButton from "@/components/BaseButton";
interface Props {}

const EditSource: React.FC<Props> = (props) => {
  const { id } = useParams();
  if (!id) return null;
  const sourceId = parseInt(id);
  const source = useAppSelector((state) => state.sources.sources[sourceId]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSubmit(values: Source, actions: FormikHelpers<Source>) {
    dispatch(
      updateSource({
        id: sourceId,
        source: values,
      })
    );
    navigate("/");
  }

  function handleCancel(values: Source, actions: FormikHelpers<Source>) {
    //
  }

  return (
    <Wrapper>
      <Link to="/">Go Back</Link>
      <Heading>Edit Source</Heading>
      <Formik
        initialValues={source}
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
const Heading = styled.h1`
  font-size: 2rem;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: end;
`;
export default EditSource;
