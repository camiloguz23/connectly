import BtnHome from "@/shared/components/btn-home";
import style from "./init.module.css";
import { IconStreamMain } from "@/shared/components";

export default function Home() {
  return (
    <main className={style.main}>
      <h2>Meet code</h2>
      <div className={style.card}>
        <IconStreamMain />
        <form className={style.form}>
          <p>Ingresa tu nombre</p>
        </form>
      </div>
      <BtnHome />
    </main>
  );
}
