import React from "react";

export interface GoatCounterProps {
  code?: string;
  path?: string;
  title?: string;
  referrer?: string;
  width?: number;
  height?: number;
  scale?: number;
}

export function GoatCounter({ code, ...props }: GoatCounterProps) {
  if (
    typeof window !== "undefined" &&
    process.env.NODE_ENV === "production" &&
    code
  ) {
    const path = props.path || window.location.pathname;
    const title = props.title || document.title;
    const referrer = props.referrer || document.referrer;
    const width = props.width || window.screen.width;
    const height = props.height || window.screen.height;
    const scale = props.scale || window.devicePixelRatio;
    const urlTitle = title && `&t=${title}`;
    const urlReferrer = referrer && `&r=${referrer}`;
    const urlScreen =
      width && height && scale ? `&s=${width},${height},${scale}` : "";
    return (
      <img
        style={{
          display: "none",
        }}
        src={`https://${code}.goatcounter.com/count?p=${path}${urlTitle}${urlReferrer}${urlScreen}`}
      />
    );
  } else {
    return null;
  }
}
