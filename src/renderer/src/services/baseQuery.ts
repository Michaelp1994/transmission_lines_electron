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
        const data = window.api.invoke(args);
        return { data };
    }
    const data = await window.api.invoke(args.url, args.body);
    return { data };
};

export default baseQuery;
