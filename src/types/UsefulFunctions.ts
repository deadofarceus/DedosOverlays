import React from "react";
import { useLocation } from "react-router-dom";

export function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function isOBSBrowser(): boolean {
    const browserName = navigator.userAgent.toLowerCase();

    if (browserName.indexOf('firefox') > -1) {
        return false;
    } else if (browserName.indexOf('chrome') > -1) {
        return true;
    } else if (browserName.indexOf('safari') > -1) {
        return false;
    } else if (browserName.indexOf('opera') > -1) {
        return false;
    } else if (browserName.indexOf('edge') > -1) {
        return false;
    }
    return true;
}