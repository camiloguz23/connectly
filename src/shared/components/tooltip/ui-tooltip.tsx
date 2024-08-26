import React from "react";
import style from "./tooltip.module.css";

interface Props {
  children: React.ReactNode;
  message: string;
}

export function UiTooltip({ children, message }: Props) {
  return (
    <div className={style.containerToolTip}>
      <div className={style.tooltip}>{message}</div>
      {children}
    </div>
  );
}
