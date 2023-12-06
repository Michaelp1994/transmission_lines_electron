import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateTransmissionLine } from "@/store/TransmissionLinesSlice";
import SourceSelect from "@/components/SourceSelect";
import TowerSelect from "@/components/TowerSelect";
import BaseButton from "@/components/BaseButton";
import FormInput from "@/components/FormInput";

interface Props {}

const EditTransmissionLine: React.FC<Props> = (props) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  if (!id) return null;
  const sourceId = parseInt(id);
  const transmissionLine = useAppSelector(
    (state) => state.transmissionLines.transmissionLines[sourceId]
  );
  function onSubmit(values: TransmissionLine) {
    dispatch(
      updateTransmissionLine({ id: sourceId, transmissionLine: values })
    );
    navigate("/");
  }
  return (
    <Wrapper>
      <Link to="/">Go Back</Link>
      <Heading>Edit Transmission Line</Heading>
      <Formik initialValues={transmissionLine} onSubmit={onSubmit}>
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
          <BaseButton type="submit">Save Changes</BaseButton>
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

export default EditTransmissionLine;
