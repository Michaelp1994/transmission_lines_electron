import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import { Button } from "component-library";
import { useTranslation } from "react-i18next";

import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "@/components/DataTable";
import ROUTES from "@/router/routes";
import { useAllConductorTypesQuery } from "@/services/api";

const columnHelper = createColumnHelper<ConductorType>();

interface EditButtonProps {
    id: number;
}

const EditButton: React.FC<EditButtonProps> = ({ id }) => {
    const navigate = useNavigate();
    function handleClick() {
        navigate(ROUTES.EDIT_CONDUCTOR_TYPE.buildPath({ id }));
    }
    return (
        <Button variant="ghost" size="icon" onClick={() => handleClick()}>
            <Info />
        </Button>
    );
};

interface Props {}

const ConductorTable: React.FC<Props> = () => {
    const { data, error, isLoading } = useAllConductorTypesQuery();
    const { t } = useTranslation("translation");

    const columns = [
        columnHelper.accessor("name", {
            header: () => t("name"),
            cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("coreDiameter", {
            header: () => t("coreDiameter"),
            cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("acResistance75", {
            header: () => t("acResistance75"),
            cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("gmr", {
            header: () => t("geometricMeanRadius"),
            cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("id", {
            header: () => t("actions"),
            cell: (props) => <EditButton id={props.getValue()} />,
        }),
    ];
    if (isLoading) {
        return <div>{t("loading")}</div>;
    }
    if (error || !data) {
        return <div>{t("errorMessage")}</div>;
    }
    return <DataTable data={data} columns={columns} />;
};

export default ConductorTable;
