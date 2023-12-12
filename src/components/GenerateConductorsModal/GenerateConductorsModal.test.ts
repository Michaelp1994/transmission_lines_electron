import styled from "styled-components";
import React, { useState } from "react";
import BaseModal from "../BaseModal";
import BaseButton from "../BaseButton";
import FormInput from "../FormInput";
import TowerSelect from "../TowerSelect";
import { Formik, FormikProps, useFormikContext } from "formik";

interface GenerateConfig {
  name: string;
  numTowers: number;
  resistance: number;
  distance: number;
  geometry: number;
}
interface Props {
  onSubmit(values: GenerateConfig): void;
}

const GenerateConductorsModal: React.FC<Props> = ({ onSubmit }) => {
  const initialValues: GenerateConfig = {
    name: "",
    numTowers: 1,
    resistance: 15,
    distance: 1,
    geometry: 1,
  };
  const [open, setOpen] = useState(false);
  function handleSubmit(values: GenerateConfig) {
    onSubmit(values);

    setOpen(false);
  }
  return (
    <Wrapper>
      <BaseButton onClick={() => setOpen(true)}>Generate Towers</BaseButton>
      <BaseModal open={open} onClose={() => setOpen(false)}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(props: FormikProps<any>) => (
            <ModalContent>
              <div>Generate Towers</div>
              <FormInput
                label="Name Prefix"
                name="name"
                type="text"
                placeholder="Example"
                required
              />
              <TowerSelect label="Tower Type" name="geometry" />
              <FormInput
                label="Number of Towers"
                name="numTowers"
                type="number"
                placeholder="Example"
                required
              />
              <FormInput
                label="Average Tower Resistance (km)"
                name="resistance"
                type="number"
                placeholder="Example"
                required
              />
              <FormInput
                label="Total Distance"
                name="distance"
                type="text"
                placeholder="Example"
                required
              />
              <BaseButton type="submit" onClick={() => props.handleSubmit()}>
                Generate
              </BaseButton>
            </ModalContent>
          )}
        </Formik>
      </BaseModal>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Form = styled.form``;
export default GenerateConductorsModal;
