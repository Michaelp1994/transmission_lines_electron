import ApiEvent from "@shared/ApiEvent";
import { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query/react";

const baseQuery: BaseQueryFn<
    ApiEvent | (FetchArgs & { url: ApiEvent }),
    unknown,
    { reason: string },
    {},
    {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = async (args, _api, _extraOptions) => {
    // console.log("args", args);
    if (typeof args === "string") {
        const data = window.electron.ipcRenderer.invoke(args);
        return { data };
    }
    const data = await window.electron.ipcRenderer.invoke(args.url, args.body);
    return { data };
};

export default baseQuery;
