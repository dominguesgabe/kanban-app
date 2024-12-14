import Image from "next/image";
import { FormLogin } from "./components/FormLogin";
import { FormRegister } from "./components/FormRegister";

interface IParams {
  slug: string[];
}

export default async function Login({ params }: { params: IParams }) {
  const { slug } = await params;

  const isLogin = slug[0] === "login";
  return (
    <div
      className="flex flex-col px-2 items-center justify-center h-[100vh] w-full gap-8"
    >
      <Image
        src={"/logo.png"}
        alt="Kanban logo"
        width={100}
        height={100}
        priority
      />
      {
        isLogin ? (
          <FormLogin />
        ) : (
          <FormRegister />
        )
      }
    </div>
  );
}
