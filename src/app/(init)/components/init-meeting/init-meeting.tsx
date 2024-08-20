"use client";

import React from "react";
import styles from "./init-meeting.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function InitMeeting() {
  const route = useRouter();
  const [valueId, setValueId] = useState<string>("");
  const onCreateJoin = () => {
    const id = crypto.randomUUID();
    route.push(`/room/${id}`);
  };

  const joinRoom = () => {
    if (!valueId) return;
    route.push(`/room/${valueId}`);
  };

  return (
    <div className={styles["init-meeting"]}>
      <h1>Connectly</h1>
      <button onClick={onCreateJoin} className={styles.btnCreateRoom}>
        Crear una Reunion
      </button>
    </div>
  );
}
