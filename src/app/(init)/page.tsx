import BtnHome from "@/shared/components/btn-home";
import style from "./init.module.css";
import { IconStreamMain } from "@/shared/components";
import { InitMeeting } from "./components";

export default function Home() {
  return (
    <main className={style.main}>
      <h2>Meet code</h2>
      <div className={style.card}>
        <IconStreamMain />
        <InitMeeting />
      </div>
      <BtnHome />
    </main>
  );
}
