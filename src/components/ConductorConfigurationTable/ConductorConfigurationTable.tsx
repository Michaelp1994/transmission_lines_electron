import styled from "styled-components";
import React from "react";
import { FieldArray } from "formik";

import BaseButton from "../BaseButton";
import ConductorSelect from "../ConductorSelect";
import FormInput from "../FormInput";
import GenerateConductorsModal from "../GenerateConductorsModal";
interface GenerateConfig {
  phases: number;
  circuits: number;
  neutrals: number;
  phaseConductorTypeId: number;
  neutralConductorTypeId: number;
}

interface Props {}
function addConductor() {
  return {
    name: "",
    fromPhase: 0,
    toPhase: 0,
    bundleNumber: 1,
    bundleSpacing: 0,
    type: 0,
  };
}
const ConductorConfigurationTable: React.FC<Props> = (props) => {
  return (
    <FieldArray
      name="conductors"
      render={(arrayHelpers) => {
        function generateConductors(values: GenerateConfig) {
          const newConductors = [];
          for (let i = 0; i < values.circuits; i++) {
            for (let j = 0; j < values.phases; j++) {
              newConductors.push({
                name: `${String.fromCharCode(65 + j)}${i + 1}`,
                fromPhase: j + 1,
                toPhase: j + 1,
                bundleNumber: 1,
                bundleSpacing: 0,
                type: values.phaseConductorTypeId,
              });
            }
          }
          for (let i = 0; i < values.neutrals; i++) {
            newConductors.push({
              name: `N${i + 1}`,
              fromPhase: 99,
              toPhase: 99,
              bundleNumber: 1,
              bundleSpacing: 0,
              type: values.neutralConductorTypeId,
            });
          }
          console.log(newConductors);
          arrayHelpers.form.setFieldValue("conductors", newConductors);
        }
        return (
          <Wrapper>
            <CardHeader>
              <CardTitle>Conductor Configuration</CardTitle>
              <CardHeaderActions>
                <GenerateConductorsModal
                  onSubmit={(values) => generateConductors(values)}
                />
                <BaseButton
                  type="button"
                  onClick={() =>
                    arrayHelpers.form.setFieldValue("conductors", [
                      addConductor(),
                    ])
                  }
                  disabled={arrayHelpers.form.values.conductors.length === 1}
                >
                  Remove All
                </BaseButton>
                <BaseButton
                  type="button"
                  onClick={() => arrayHelpers.push(addConductor())}
                >
                  Add
                </BaseButton>
              </CardHeaderActions>
            </CardHeader>
            <CardContent>
              <Table>
                <Row>
                  <RowHeader>Name</RowHeader>
                  <RowHeader>From Phase</RowHeader>
                  <RowHeader>To Phase</RowHeader>
                  <RowHeader>Bundle Number</RowHeader>
                  <RowHeader>Bundle Spacing</RowHeader>
                  <RowHeader>Type</RowHeader>
                  <RowHeader>Actions</RowHeader>
                </Row>
                {arrayHelpers.form.values.conductors.map((_, index) => {
                  return (
                    <Row key={index}>
                      <FormInput
                        name={`conductors[${index}].name`}
                        type="text"
                        placeholder="Example"
                        required
                      />
                      <FormInput
                        name={`conductors[${index}].fromPhase`}
                        type="text"
                        placeholder="Example"
                        required
                      />
                      <FormInput
                        name={`conductors.${index}.toPhase`}
                        type="text"
                        placeholder="Example"
                        required
                      />
                      <FormInput
                        name={`conductors.${index}.bundleNumber`}
                        type="number"
                        placeholder="Example"
                        required
                      />
                      <FormInput
                        name={`conductors.${index}.bundleSpacing`}
                        type="number"
                        placeholder="Example"
                        required
                      />
                      <ConductorSelect name={`conductors.${index}.type`} />
                      <BaseButton onClick={() => arrayHelpers.remove(index)}>
                        Remove
                      </BaseButton>
                    </Row>
                  );
                })}
              </Table>
            </CardContent>
          </Wrapper>
        );
      }}
    />
  );
};

const Wrapper = styled.div`
  border-radius: 16px;
  border: 1px black solid;
`;

const CardHeader = styled.div`
  background-color: blue;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  color: white;
  padding: 10px;
  padding-inline: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CardTitle = styled.div``;
const CardHeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;
const CardContent = styled.div`
  padding: 10px;
`;
const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const RowHeader = styled.div`
  display: block;
  flex: 1;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  gap: 0.75rem;

  & > * {
    flex: 1;
  }
`;

export default ConductorConfigurationTable;
