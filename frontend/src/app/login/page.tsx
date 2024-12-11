import Image from "next/image";
import { FormLogin } from "./components/FormLogin";


export default function Login() {
  return (
    <div
      className="flex flex-col px-2 items-center justify-center h-[100vh] w-full gap-8"
    >
      <Image
        src={"/logo.png"}
        alt="Kanban logo"
        width={100}
        height={100}
      />
      <FormLogin />
    </div>
  );
}
