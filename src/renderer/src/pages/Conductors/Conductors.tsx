import styled from "styled-components";
import { Button } from "component-library";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ConductorTypeTable } from "@/features/conductorTypes";
import Routes from "@/router/routes";

interface Props {}

const Conductors: React.FC<Props> = () => {
    const { t } = useTranslation("translation");

    return (
        <Wrapper>
            <Button asChild>
                <Link to={Routes.ADD_CONDUCTOR.path}>{t("addConductor")}</Link>
            </Button>
            <ConductorTypeTable />
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default Conductors;
