import React from "react";
import { useLocation } from "react-router-dom";

export function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function isOBSBrowser(): boolean {
    const browserName = navigator.userAgent.toLowerCase();
    return browserName.indexOf('obs') > -1 || browserName.indexOf('streamlabs') > -1;
}