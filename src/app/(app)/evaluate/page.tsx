import Chat from "../../../components/Chat";
import EvaluateNavBar from "../../../components/EvaluateNavBar";
import { getCurrUserInfo } from "../../api/actions";
import "./evaluate.css";

export default async function Page() {
  const userInfo = await getCurrUserInfo();
  return (
    <>
      <div className="w-full relative max-w-[800px] px-4">
        <EvaluateNavBar />
        <div className="pt-[50px] h-[50rem]">
          <Chat userInfo={userInfo} className="" />
        </div>
      </div>
    </>
  );
}
