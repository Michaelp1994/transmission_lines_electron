import { Button } from "component-library";
import { Info } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import DataTable from "@/components/DataTable";
import ROUTES from "@/router/routes";
import { useAllTowerGeometriesQuery } from "@/services/api";

interface Props {}

const columnHelper = createColumnHelper<TowerGeometry>();

interface EditButtonProps {
    id: number;
}

const EditButton: React.FC<EditButtonProps> = ({ id }) => {
    const navigate = useNavigate();
    function handleClick() {
        navigate(ROUTES.EDIT_TOWER_GEOMETRY.buildPath({ id }));
    }
    return (
        <Button variant="ghost" size="icon" onClick={handleClick}>
            <Info />
        </Button>
    );
};

const GeometriesTable: React.FC<Props> = () => {
    const { t } = useTranslation("translation");
    const { data = [], error, isLoading } = useAllTowerGeometriesQuery();
    const columns = [
        columnHelper.accessor("name", {
            header: `${t("name")}`,
            cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("id", {
            header: `${t("actions")}`,
            cell: (props) => <EditButton id={props.getValue()} />,
        }),
    ];
    if (error) {
        return <div>{t("errorMessage")}</div>;
    }
    if (isLoading) {
        return <div>{t("loading")}</div>;
    }
    return <DataTable data={data} columns={columns} />;
};

export default GeometriesTable;
