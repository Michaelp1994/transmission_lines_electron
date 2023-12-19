import styled from "styled-components";
import React, { useState } from "react";
import { Formik, FormikProps } from "formik";
import BaseModal from "@/components/BaseModal";
import BaseButton from "@/components/BaseButton";
import FormInput from "@/components/FormInput";
import { TowerGeometrySelect } from "@/features/towerGeometries";

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

const GenerateTowersModal: React.FC<Props> = ({ onSubmit }) => {
    const initialValues: GenerateConfig = {
        name: "T",
        numTowers: 10,
        resistance: 15,
        distance: 10,
        geometry: 1,
    };
    const [open, setOpen] = useState(false);
    function handleSubmit(values: GenerateConfig) {
        onSubmit(values);

        setOpen(false);
    }
    return (
        <Wrapper>
            <BaseButton onClick={() => setOpen(true)}>Generate</BaseButton>
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
                            <TowerGeometrySelect
                                label="Tower Type"
                                name="geometry"
                            />
                            <FormInput
                                label="Number of Towers"
                                name="numTowers"
                                type="number"
                                placeholder="Example"
                                required
                            />
                            <FormInput
                                label="Average Tower Resistance"
                                name="resistance"
                                type="number"
                                placeholder="Example"
                                required
                            />
                            <FormInput
                                label="Total Distance (km)"
                                name="distance"
                                type="number"
                                placeholder="Example"
                                required
                            />
                            <BaseButton
                                type="submit"
                                onClick={() => props.handleSubmit()}
                            >
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
export default GenerateTowersModal;
