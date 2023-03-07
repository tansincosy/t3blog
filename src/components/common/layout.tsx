import {
  applyTheme,
  argbFromHex,
  themeFromSourceColor,
} from "@material/material-color-utilities";
import React, { type ReactNode, useEffect } from "react";
import "twin.macro";

export const Layout = ({
  children,
  themeColor,
}: {
  children: ReactNode;
  themeColor?: string;
}) => {
  useEffect(() => {
    const theme = themeFromSourceColor(argbFromHex(themeColor || "#066bf8"));
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    applyTheme(theme, { target: document.body, dark: false });
  }, [themeColor]);

  return (
    <div tw="absolute flex left-0 right-0 bottom-0 top-0 flex-col">
      <section tw="bg-background flex-1 pb-20 box-border">{children}</section>
    </div>
  );
};
