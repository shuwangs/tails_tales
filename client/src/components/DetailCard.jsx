import { useState } from "react";
import { LuArrowLeftToLine, LuCalendarHeart, LuPencil, LuTrash2 } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEntries } from "../contexts/EntriesContext.jsx";
import { getMoodIcon } from "../utils/getIcons";
import TranslateCard from "./TranslateCard.jsx";
import DeleteBtn from "./ui/DeleteBtn.jsx";
import GeneralContainer from "./ui/GeneralContainer";

const DetailCard = ({ entry }) => {
	const navigate = useNavigate();
	const { deleteEntryHandler, error, loading, editEntry } = useEntries();
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [draft, setDraft] = useState({
		title: entry.title ?? "",
		content: entry.content,
	});
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState("");
	const [saveMessage, setSaveMessage] = useState("");
	const hasChanges =
		draft.title !== (entry.title ?? "") ||
		draft.content !== entry.content;

	const handleDraftChange = (event) => {
		const { name, value } = event.target;

		setDraft((prev) => ({
			...prev,
			[name]: value,
		}));

		setSaveError("");
		setSaveMessage("");
	};
	const handleSave = async (event) => {
		event.preventDefault();

		if (isSaving || !hasChanges) return;

		setIsSaving(true);
		setSaveError("");
		setSaveMessage("");

		try {
			const updatedEntry = await editEntry(entry.id, {
				title: draft.title,
				content: draft.content,
				mood: entry.mood ?? "",
				entry_date: entry.entry_date.slice(0, 10),
			});

			setDraft({
				title: updatedEntry.title ?? "",
				content: updatedEntry.content,
			});

			setSaveMessage("Changes saved.");
		} catch (err) {
			setSaveError(err.message);
		} finally {
			setIsSaving(false);
		}
	};

	const handleCancel = () => {
		setDraft({
			title: entry.title ?? "",
			content: entry.content,
		});

		setSaveError("");
		setSaveMessage("");
	};

	const handleDeleteEntry = async (entry_id) => {
		try {
			await deleteEntryHandler(Number(entry_id));

			navigate("/entries", {
				state: { message: "Diary deleted successfully 😿" },
			});
		} catch (err) {
			toast.error(err.message, {
				position: "top-right",
			});
		}
	};
	if (error) return <p>{error}</p>;
	if (loading) return <p>Loading</p>;

	return (
		<GeneralContainer className="mt-10 w-80/100 mx-auto gap-6 ">

			<form onSubmit={handleSave} className="flex flex-col gap-6">
				{saveError && (
					<p role="alert" className="px-8 text-red-700">
						{saveError}
					</p>
				)}
				{saveMessage && (
					<p role="alert" className="px-8 text-green-700">
						{saveMessage}
					</p>
				)}

				<div className="flex justify-between items-center bg-amber-300 p-8">
					<div className="flex flex-col gap-4">
						<h2 className="font-heading text-4xl text-amber-800">
							{entry.title}{" "}
						</h2>
						<p className="flex gap-2 text-xl">
							{" "}
							<LuCalendarHeart />{" "}
							<span>
								{new Date(entry.entry_date).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric",
								})}
							</span>
						</p>
					</div>
					<div className="text-2xl">
						<h2 className="text-5xl">{getMoodIcon(entry.mood)}</h2>
					</div>
				</div>
				<div className="bg-white flex flex-col gap-6">
					<div className="px-8 text-mono text-amber-800 text-2xl px-2 line-">
						{entry.content}
					</div>

					{/* Translate Card */}
					<div className="px-8">
						<TranslateCard content={entry.content} />
					</div>

					<div className="flex flex-row  gap-6 px-8 pb-6">
						<button
							type="submit"
							form="edit-entry-form"
							disabled={!hasChanges || isSaving}
							className="flex-1 rounded-full bg-amber-500 px-4 py-2 text-white disabled:opacity-50"
						>
							{isSaving ? "Saving..." : "Save"}
						</button>
						<button
							type="button"
							onClick={handleCancel}
							disabled={!hasChanges || isSaving}
							className="flex-1 rounded-full bg-gray-200 px-4 py-2 disabled:opacity-50"
						>
							Cancel
						</button>
						<DeleteBtn
							onClick={() => setShowDeleteConfirm(true)}
							className="bg-amber-500 hover:bg-amber-600 text-red-600 text-xl flex-[1] justify-center"
						>
							<LuTrash2 /> Delete
						</DeleteBtn>
						<Link
							to="/entries"
							className="flex items-center justify-center px-6 rounded-full bg-gray-200 hover:bg-gray-300 text-black text-xl flex-[1]"
						>
							<LuArrowLeftToLine /> Back
						</Link>
					</div>

					{showDeleteConfirm && (
						<div className="rounded-lg border-2 border-red-500 mx-6 p-4 mb-6">
							<h3 className="text-red-700 mb-4">
								Are you sure you want to delete this diary? 😿
							</h3>

							<div className="flex gap-6">
								<DeleteBtn onClick={() => handleDeleteEntry(Number(entry.id))}>
									Yes, Delete
								</DeleteBtn>
								<button
									onClick={() => setShowDeleteConfirm(false)}
									type="button"
									className="bg-gray-200 hover:bg-gray-400 px-6 rounded-full"
								>
									Cancel
								</button>
							</div>
						</div>
					)}
				</div>
			</form>
		</GeneralContainer>
	);
};
export default DetailCard;
