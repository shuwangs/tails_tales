import { FaRegClock } from "react-icons/fa";
import { getMoodIcon } from "../utils/getIcons.js";
import GeneralContainer from "./ui/GeneralContainer.jsx";

const EntryCard = ({ entry }) => {
	return (
		<GeneralContainer className="w-full h-full min-h-[200px] break-words">
			<div className="flex flex-col p-4 gap-4 h-full">
				<div className="flex justify-between text-xl">
					<h3 className="min-w-0 line-clamp-2 font-heading text-amber-800 font-bold">
						{entry.title}
					</h3>
					<span className="shrink-0">{getMoodIcon(entry.mood)}</span>
				</div>
				<div className="text-wrap">
					<p className="line-clamp-3 ">{entry.content}</p>
				</div>

				<div className="flex items-center gap-2 text-amber-500 mt-auto">
					{" "}
					<span>
						<FaRegClock />{" "}
					</span>
					{new Date(entry.entry_date).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
						year: "numeric",
					})}
				</div>
			</div>
		</GeneralContainer>
	);
};

export default EntryCard;
