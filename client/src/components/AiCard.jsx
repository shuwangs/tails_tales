import { HiMiniSparkles } from "react-icons/hi2";
import { useEntries } from "../contexts/EntriesContext.jsx";
import AiBtn from "./ui/AiBtn.jsx";
import AiDiv from "./ui/AiDiv.jsx";
import { useEffect } from "react";

const AiCard = ({content}) => {
	const {suggestedTitles, isGenerating, handleSuggestTitle} = useEntries();
	useEffect(()=>{
		console.log("suggestion titles are: ",suggestedTitles);
	}, [suggestedTitles])
	return (
		<AiDiv>
			<h2 className="flex gap-2 text-2xl font-bold text-violet-700 text-left">
				{" "}
				<HiMiniSparkles /> AI Writing Assistant
			</h2>
			<div className="flex gap-8">
				<AiBtn type="button" 
				onClick={()=>handleSuggestTitle(content)}
				disabled={isGenerating || !content?.trim()}>
					{isGenerating ? "Generating..." : "Suggest a Title"}
				</AiBtn>

				{/* <AiBtn>Summarize</AiBtn> */}
				<div className="flex border-2 border-violet-700 gap-2 ">
				{suggestedTitles.map((title, index) => (
					<div key={index}>{title}</div>
				))}
			</div>
			</div>
		</AiDiv>
	);
};
export default AiCard;
