import styled from "styled-components";
import { Link } from "react-router-dom";
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
import { Trash2, Info } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeTransmissionLine } from "@/store/TransmissionLinesSlice";

import ROUTES from "@/router/routes";

interface Props {}

const TransmissionLinesList: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    function removeLine(id: string) {
        dispatch(removeTransmissionLine(id));
    }
    const transmissionLines = useAppSelector(
        (state) => state.transmissionLines
    );

    return (
        <ListWrapper>
            {transmissionLines?.map(({ id, name }) => (
                <ListItem key={id}>
                    <ItemText>{name}</ItemText>
                    <ItemActions>
                        <Button variant="ghost" asChild>
                            <Link
                                to={ROUTES.EDIT_TRANSMISSION_LINE.buildPath({
                                    id,
                                })}
                            >
                                <InfoIcon />
                            </Link>
                        </Button>
                        <ConfirmDialog onConfirm={() => removeLine(id)} />
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

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ onConfirm }) => (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
                <CloseIcon />
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the transmission line.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    className={buttonVariants({ variant: "destructive" })}
                    onClick={() => onConfirm()}
                >
                    Continue
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);

export default TransmissionLinesList;
