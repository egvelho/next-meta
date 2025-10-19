import React from "react";
import { getCmsConfig, CmsConfig } from "./get-cms-config";

export type CmsProps = CmsConfig & {
  onBeforeLoad?: () => Promise<void>;
};

async function loadNetlifyCms({ onBeforeLoad, ...config }: CmsProps) {
  if (document.querySelector("#nc-root") !== null) {
    return;
  }

  (window as any).CMS_MANUAL_INIT = true;

  const root = document.createElement("div");
  const style = document.createElement("style");

  root.id = "nc-root";
  document.body.appendChild(root);

  style.id = "nc-root-style";
  style.innerHTML = `
    #nc-root > div > section > span {
      text-align: center;
    }

    body > *:not(#nc-root):not(.ReactModalPortal) {
      display: none;
    }`;

  document.head.appendChild(style);

  // @ts-ignore
  await import("netlify-cms/dist/netlify-cms");

  while ((window as any).initCMS === undefined) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  onBeforeLoad && (await onBeforeLoad());

  // @ts-ignore
  window.initCMS(getCmsConfig(config));
}

export function Cms(props: CmsProps) {
  React.useEffect(() => {
    loadNetlifyCms(props);

    return () => {
      document.querySelector("#nc-root")?.remove();
      document.querySelector("#nc-root-style")?.remove();
    };
  }, []);

  return null;
}
