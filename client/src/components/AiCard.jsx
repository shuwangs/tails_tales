import GeneralContainer from "./ui/GeneralContainer";
import AiDiv from "./ui/AiDiv.jsx";
import AiBtn from "./ui/AiBtn.jsx";
import { HiMiniSparkles } from "react-icons/hi2";

const AiCard = () => {
	return (
		<AiDiv>
			<h2 className="flex gap-2 text-2xl font-bold text-violet-700 text-left">
				{" "}
				<HiMiniSparkles /> AI Writing Assistant
			</h2>
			<div className="flex gap-8">
				<AiBtn>Suggest a Title</AiBtn>
				<AiBtn>Summarize</AiBtn>
			</div>
		</AiDiv>
	);
};
export default AiCard;
