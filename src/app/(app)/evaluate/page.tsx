import Chat from "../../../components/Chat";
import EvaluateNavBar from "../../../components/EvaluateNavBar";
import { getCurrUserInfo } from "../../api/actions";
import "./evaluate.css";

export default async function Page() {
  const userInfo = await getCurrUserInfo();
  return (
    <div className="pt-8 pr-16">
      <div className="relative">
        <EvaluateNavBar />
        <Chat userInfo={userInfo} className="pt-[75px]" />
      </div>
    </div>
  );
}
