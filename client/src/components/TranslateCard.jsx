import { useState } from "react";
import { LuWandSparkles } from "react-icons/lu";
import AiDiv from "./ui/AiDiv.jsx";
import AiBtn from "./ui/AiBtn.jsx";
import { languages } from "../utils/ConstantOptions.js";
import { getFlagIcon } from "../utils/getIcons.js";
const TranslateCard = () => {
	const [targetLang, setTargetLang] = useState("zh");
	const handleTranslate = () => {
		console.log("translate button is clicked");
	};

	return (
		<AiDiv className="flex flex-col gap-4">
			<h3 className="flex gap-2 text-xl text-violet-700 font-bold">
				{" "}
				<LuWandSparkles /> <span>AI Tools</span>{" "}
			</h3>

			<div className="flex gap-10">
				<select
					value={targetLang}
					onChange={(event) => setTargetLang(event.target.value)}
					className="border rounded-xl border-violet-500 text-violet-700 text-mono text-lg p-2"
				>
					{languages.map((lang) => (
						<option 
                            key={lang.code}
                            value={lang.code}>
							{getFlagIcon(lang.code)} {lang.label}
						</option>
					))}
				</select>
				<AiBtn 
                    className="text-lg hover:bg-violet-200"
                    onClick={handleTranslate} 
                >
					Translate
				</AiBtn>
			</div>
		</AiDiv>
	);
};

export default TranslateCard;
