import styled from "styled-components";
import { Link } from "react-router-dom";
import { Info, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
    Button,
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    buttonVariants,
} from "component-library";
import { removeSource } from "@/store/SourcesSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import Routes from "@/router/routes";

interface Props {}

const SourcesList: React.FC<Props> = () => {
    const dispatch = useAppDispatch();

    function remove(id: string) {
        dispatch(removeSource(id));
    }

    const sources = useAppSelector((state) => state.sources);
    return (
        <ListWrapper>
            {sources?.map(({ id, name }) => (
                <ListItem key={id}>
                    <ItemText>{name}</ItemText>
                    <ItemActions>
                        <Button asChild variant="ghost">
                            <Link to={Routes.EDIT_SOURCE.buildPath({ id })}>
                                <InfoIcon />
                            </Link>
                        </Button>
                        <ConfirmDialog onConfirm={() => remove(id)} />
                    </ItemActions>
                </ListItem>
            ))}
        </ListWrapper>
    );
};

const ListWrapper = styled.div`
    max-width: 500px;
    border: 1px solid rgb(222, 226, 230);
    border-radius: 6px;
`;
const ListItem = styled.div`
    min-height: 48px;
    padding-inline: 16px;
    padding-block: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
    }
`;
const ItemText = styled.div`
    font-size: 1.5rem;
`;
const ItemActions = styled.div`
    display: flex;
    gap: 4px;
`;

const CloseIcon = styled(Trash2)`
    height: 24px;
    width: 24px;
`;

const InfoIcon = styled(Info)`
    height: 24px;
    width: 24px;
`;

interface ConfirmDialogProps {
    onConfirm(): void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ onConfirm }) => {
    const { t } = useTranslation("translation");

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <CloseIcon />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {t("confirmationTitle")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {t("cannotUndo")}
                        {t("sourceDeletionWarning")}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                    <AlertDialogAction
                        className={buttonVariants({ variant: "destructive" })}
                        onClick={() => onConfirm()}
                    >
                        {t("delete")}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SourcesList;
