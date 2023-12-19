/* eslint-disable react/jsx-props-no-spreading */
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    to?: string;
    children?: React.ReactNode;
}

const BaseButton: React.FC<Props> = ({
    to,
    children,
    onClick,
    ...otherProps
}) => {
    const navigate = useNavigate();
    function handleClick(
        eventHandler: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        if (onClick) {
            onClick(eventHandler);
        }
        if (to) {
            navigate(to);
        }
    }
    return (
        <Button onClick={handleClick} type="button" {...otherProps}>
            {children}
        </Button>
    );
};

export const Button = styled.button`
    border: 0px;
    background-color: white;
    border-radius: 0.5rem;
    padding-inline: 1rem;
    height: 2.5rem;
    max-width: 200px;
    cursor: pointer;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1),
        inset 0 -1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: hsl(204 20% 96%);
    }
`;

export default BaseButton;
