import { redirect } from "next/navigation";
import React from "react";

export default function PageRoom() {
  redirect("/");
  return <div>PageRoom</div>;
}
