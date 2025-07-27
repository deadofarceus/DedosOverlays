import React from "react";
import { useLocation } from "react-router-dom";

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function buzzer(id: string, name: string) {
  fetch("https://cacedray.ddns.net:8443/buzzer/" + id + "?name=" + name, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

export function isOBSBrowser(): boolean {
  const browserName = navigator.userAgent.toLowerCase();
  return (
    browserName.indexOf("obs") > -1 ||
    browserName.indexOf("sld") > -1 ||
    browserName.indexOf("electron") > -1
  );
}
