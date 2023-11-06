import { Link } from "react-router-dom";
import styled from "styled-components";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import FormInput from "@/components/FormInput";
import SourceSelect from "@/components/SourceSelect";
import TowerSelect from "@/components/TowerSelect";
import BaseButton from "@/components/BaseButton";

import { useAppDispatch } from "@/store";
import { addTransmissionLine } from "@/store/TransmissionLinesSlice";
import type { TransmissionLine } from "@/types/TransmissionLine";

interface Props {}

const AddTransmissionLine: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    phases: 3,
    distance: 0,
    from: 0,
    to: 0,
    numTowers: 0,
    towerResistance: 0,
    geometry: 0,
  };
  function onSubmit(values: TransmissionLine) {
    dispatch(addTransmissionLine(values));
    navigate("/");
  }
  return (
    <Wrapper>
      <Link to="/">Back</Link>
      <Heading>Add Transmission Line</Heading>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <StyledForm>
          <FormInput
            label="Name"
            name="name"
            type="text"
            placeholder="Example"
            required
          />
          <FormInput
            label="Distance (km)"
            name="distance"
            type="number"
            placeholder="1000"
            required
          />
          <FormInput
            label="Number of Towers"
            name="numTowers"
            type="number"
            placeholder="3"
            required
          />
          <FormInput
            label="Phases"
            name="phases"
            type="number"
            placeholder="3"
            required
          />
          <FormInput
            label="Tower Resistance"
            name="towerResistance"
            type="number"
            placeholder="15"
            required
          />
          <SourceSelect label="From" name="from" id="from" />
          <SourceSelect label="To" name="to" id="to" />
          <TowerSelect label="Tower Geometry" name="geometry" />
          <BaseButton type="submit">Add Transmission Line</BaseButton>
        </StyledForm>
      </Formik>
    </Wrapper>
  );
};

export default AddTransmissionLine;

const Wrapper = styled.div``;
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Heading = styled.h1`
  font-size: 2rem;
`;
