import Chat from "../../../../components/Chat";
import EvaluateNavBar from "../../../../components/EvaluateNavBar";
import { getCurrUserInfo } from "../../../api/actions";
import "./evaluate.css";

export default async function Page() {
  const userInfo = await getCurrUserInfo();
  return (
    <div className="relative">
      <EvaluateNavBar />
      <Chat userInfo={userInfo} className="pt-[60px] h-[50rem]" />
    </div>
  );
}
