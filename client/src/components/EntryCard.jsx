import { getMoodIcon } from "../utils/getIcons.js";
import GeneralContainer from "./ui/GeneralContainer.jsx";
import { FaRegClock } from "react-icons/fa";

const EntryCard = ({ entry }) => {
	return (
		<GeneralContainer className="w-90 h-50 ">
			<div className="flex flex-col px-4 gap-4 pt-4">
				<div className="flex justify-between text-xl">
					<h3 className="font-heading text-amber-800 font-bold">
						{entry.title}
					</h3>
					<span>{getMoodIcon(entry.mood)}</span>
				</div>

				<p className="font-sans">{entry.content}</p>

				<div className="flex items-center gap-2 text-amber-500">
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
