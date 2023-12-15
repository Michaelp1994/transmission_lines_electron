import styled from "styled-components";
import { ArrayHelpers, FieldArray, FormikProps } from "formik";
import BaseButton from "../BaseButton";
import FormInput from "../FormInput";
import TowerSelect from "../TowerSelect";
import GenerateTowersModal from "../GenerateTowersModal";
interface GenerateTowersInput {
  name: string;
  numTowers: number;
  resistance: number;
  distance: number;
  geometry: number;
}
type ArrayHelper = ArrayHelpers<GenerateTowersInput[]> & {
  form: FormikProps<TransmissionLineInput>;
  name: string;
};
interface Props {}
function addTower() {
  return {
    name: "",
    resistance: 15,
    distance: 1,
    geometry: 1,
  };
}

const TowerConfigurationTable: React.FC<Props> = (props) => {
  return (
    <FieldArray
      name="towers"
      render={(arrayHelpers: ArrayHelper) => {
        function generateTowers(values: GenerateTowersInput) {
          const avgDistance = values.distance / values.numTowers;
          const newTowers = Array(values.numTowers)
            .fill(0)
            .map((array, index) => ({
              name: values.name + (index + 1),
              resistance: values.resistance,
              distance: avgDistance,
              geometry: values.geometry,
            }));

          arrayHelpers.form.setFieldValue("towers", newTowers);
        }
        return (
          <Wrapper>
            <CardHeader>
              <CardTitle>Tower Configuration</CardTitle>
              <CardHeaderActions>
                <GenerateTowersModal
                  onSubmit={(values) => generateTowers(values)}
                />
                <BaseButton
                  type="button"
                  onClick={() =>
                    arrayHelpers.form.setFieldValue("towers", [addTower()])
                  }
                  disabled={arrayHelpers.form.values.towers.length === 1}
                >
                  Remove All
                </BaseButton>
                <BaseButton
                  type="button"
                  onClick={() => arrayHelpers.push(addTower())}
                >
                  Add
                </BaseButton>
              </CardHeaderActions>
            </CardHeader>
            <CardContent>
              <Table>
                <Row>
                  <RowHeader>Name</RowHeader>
                  <RowHeader>Resistance</RowHeader>
                  <RowHeader>Distance (km)</RowHeader>
                  <RowHeader>Geometry</RowHeader>
                  <RowHeader>Actions</RowHeader>
                </Row>
                {arrayHelpers.form.values.towers.map((_, index) => {
                  return (
                    <Row key={index}>
                      <FormInput
                        name={`towers[${index}].name`}
                        type="text"
                        placeholder="Example"
                        required
                      />
                      <FormInput
                        name={`towers[${index}].resistance`}
                        type="text"
                        placeholder="Example"
                        required
                      />
                      <FormInput
                        name={`towers.${index}.distance`}
                        type="text"
                        placeholder="Example"
                        required
                      />
                      <TowerSelect name={`towers.${index}.geometry`} />
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
export default TowerConfigurationTable;
