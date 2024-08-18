import React from "react";

interface Props {
  on?: boolean;
}

export function IconWebCam({ on }: Props) {
  return (
    <>
      {on ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 14 14"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12.82 3.75L10 5V3.5a1 1 0 0 0-1-1H1.5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1V9l2.82 1.25a.5.5 0 0 0 .68-.47V4.22a.5.5 0 0 0-.68-.47"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 14 14"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 13.5L.5.5m2 2H9a1 1 0 0 1 1 1V5l2.82-1.25a.5.5 0 0 1 .68.47v5.56a.5.5 0 0 1-.68.47L10 9v1M.5 3.5v7a1 1 0 0 0 1 1h7"
          />
        </svg>
      )}
    </>
  );
}
