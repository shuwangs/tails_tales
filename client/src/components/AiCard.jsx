import { HiMiniSparkles } from "react-icons/hi2";
import AiBtn from "./ui/AiBtn.jsx";
import AiDiv from "./ui/AiDiv.jsx";

const AiCard = () => {
	return (
		<AiDiv>
			<h2 className="flex gap-2 text-2xl font-bold text-violet-700 text-left">
				{" "}
				<HiMiniSparkles /> AI Writing Assistant
			</h2>
			<div className="flex gap-8">
				<AiBtn type="button">Suggest a Title</AiBtn>
				<AiBtn type="button">Placeholder</AiBtn>
			</div>
		</AiDiv>
	);
};
export default AiCard;
