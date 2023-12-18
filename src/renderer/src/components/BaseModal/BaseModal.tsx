import styled from "styled-components";
import { Dialog } from "@ariakit/react";

interface Props {
    children?: React.ReactNode;
    open: boolean;
    onClose: () => void;
}

const BaseModal: React.FC<Props> = ({ open, onClose, children }) => (
    <Modal open={open} onClose={onClose} backdrop={<Backdrop />} modal>
        {children}
    </Modal>
);

const Backdrop = styled.div`
    background-color: hsl(204 10% 10% / 0.1);
    backdrop-filter: blur(2px);
`;

const Modal = styled(Dialog)`
    position: fixed;
    inset: 0.75rem;
    z-index: 50;
    margin: auto;
    height: fit-content;
    max-height: calc(100vh - 2 * 0.75rem);
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    border-radius: 0.75rem;
    background-color: hsl(204 20% 100%);
    padding: 1rem;
    color: hsl(204 10% 10%);
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    @media (min-width: 640px) {
        & {
            top: 10vh;
            bottom: 10vh;
            margin-top: 0px;
            max-height: 80vh;
            width: 420px;
            border-radius: 1rem;
            padding: 1.5rem;
        }
    }
`;

export default BaseModal;
