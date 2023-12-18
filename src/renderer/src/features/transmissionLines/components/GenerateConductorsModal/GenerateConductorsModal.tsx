import styled from "styled-components";
import React, { useState } from "react";
import { Formik, FormikProps } from "formik";

import BaseModal from "@/components/BaseModal";
import BaseButton from "@/components/BaseButton";
import FormInput from "@/components/FormInput";
import { ConductorTypeSelect } from "@/features/conductorTypes";

interface GenerateConfig {
    phases: number;
    circuits: number;
    neutrals: number;
    phaseConductorTypeId: number;
    neutralConductorTypeId: number;
}

interface Props {
    onSubmit(values: GenerateConfig): void;
}

const GenerateConductorsModal: React.FC<Props> = ({ onSubmit }) => {
    const initialValues: GenerateConfig = {
        phases: 3,
        circuits: 2,
        neutrals: 2,
        phaseConductorTypeId: 1,
        neutralConductorTypeId: 1,
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
                                label="Phases"
                                name="phases"
                                type="number"
                                placeholder="Example"
                                required
                            />
                            <FormInput
                                label="Number of Circuits"
                                name="circuits"
                                type="number"
                                placeholder="Example"
                                required
                            />
                            <FormInput
                                label="Number of Neutrals"
                                name="neutrals"
                                type="number"
                                placeholder="Example"
                                required
                            />
                            <ConductorTypeSelect
                                label="Phase Cable Type"
                                name="phaseConductorTypeId"
                            />
                            <ConductorTypeSelect
                                label="Neutral Cable Type"
                                name="neutralConductorTypeId"
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
export default GenerateConductorsModal;
