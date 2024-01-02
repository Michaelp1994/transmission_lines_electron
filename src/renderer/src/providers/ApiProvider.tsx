import { useEffect } from "react";
import { projectApi } from "@/services/api";
import { useAppDispatch } from "@/store";

interface Props {
    children: React.ReactNode;
}

const ApiProvider: React.FC<Props> = ({ children }) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        window.api.onInvalidateCache(() => {
            dispatch(projectApi.util.resetApiState());
            console.log("TEST");
        });
    });
    return children;
};

export default ApiProvider;
