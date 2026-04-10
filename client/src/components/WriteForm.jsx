import { useEffect, useState } from "react";
import { IoMdSave } from "react-icons/io";
import { SiCcleaner } from "react-icons/si";
import { TfiThought } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEntries } from "../contexts/EntriesContext.jsx";
import { moodOpts, weatherOpts } from "../utils/ConstantOptions.js";
import { getMoodIcon, getWeatherIcon } from "../utils/getIcons.js";
import AiCard from "./AiCard";
import FormBtn from "./ui/FormBtn";
import FormDiv from "./ui/FormDiv";
import FormInput from "./ui/FormInput.jsx";
import FormLabel from "./ui/FormLabel.jsx";
import FormSelect from "./ui/FormSelect.jsx";

const WriteForm = () => {
	const navigate = useNavigate();
	const { petId, error, loading, addEntry } = useEntries();
	const today = new Date().toISOString().split("T")[0];

	const initalForm = {
		mood: "happy",
		weather: "sunny",
		title: "",
		entry_date: today,
		content: "",
	};

	const [formData, setFormData] = useState(initalForm);

	const selectSuggestedTitle = (title) => {
		setFormData((prev) => ({
			...prev,
			title,
		}));
	};
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await addEntry(petId, formData);
			setFormData(initalForm);
			navigate("/entries", {
				state: { message: "Your diary entry has been saved 🐾" },
			});
		} catch (error) {
			console.error("Submit failed:", error);
			toast.error(error.message, {
				position: "top-right",
			});
		}
	};

	const handleClear = () => {
		setFormData(initalForm);
	};

	if (error) return <p>{error}</p>;
	if (loading) return <p>Loading...</p>;

	return (
		<div>
			<h1 className="font-heading text-amber-800 pb-2 flex gap-4">
				<TfiThought /> <span>Another Day, Another Bobo Thought</span>
			</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="flex flex-row gap-6">
					<div className="flex flex-row gap-2 items-center">
						<FormLabel htmlFor="mood">ᓚ₍ ^. .^₎</FormLabel>
						<FormSelect
							onChange={handleChange}
							id="mood"
							name="mood"
							value={formData.mood}
						>
							{moodOpts.map((mood) => (
								<option value={mood.value} key={mood.value}>
									{" "}
									{mood.label} {getMoodIcon(mood.value)}
								</option>
							))}
						</FormSelect>
					</div>
					<div className="flex flex-row gap-2 items-center">
						<FormLabel htmlFor="weather">🌈</FormLabel>
						<FormSelect
							onChange={handleChange}
							name="weather"
							value={formData.weather}
						>
							{weatherOpts.map((weather) => (
								<option value={weather.value} key={weather.value}>
									{" "}
									{weather.label} {getWeatherIcon(weather.value)}
								</option>
							))}
						</FormSelect>
					</div>

					<div>
						<FormLabel htmlFor="entry_date">🗓️</FormLabel>
						<FormInput
							onChange={handleChange}
							value={formData.entry_date}
							name="entry_date"
							type="date"
						/>
					</div>
				</div>

				<div className="flex flex-col gap-6">
					<FormDiv className="flex flex-col bg-amber-50">
						<FormLabel htmlFor="title">Title </FormLabel>
						<FormInput
							onChange={handleChange}
							className="placeholder:text-amber-400"
							name="title"
							value={formData.title}
							placeholder="Give your memory a title..."
						/>
					</FormDiv>
					<FormDiv className="flex flex-col bg-amber-50">
						<FormLabel htmlFor="content">Story </FormLabel>
						<textarea
							onChange={handleChange}
							name="content"
							value={formData.content}
							className="w-full h-60 max-h-80 placeholder:text-amber-400 font-mono text-lg px-2 py-2"
							placeholder="What's on your mind today Bobo?"
						/>
					</FormDiv>
				</div>

				{/*  AI suggestion Card */}
				<AiCard
					selectSuggestedTitle={selectSuggestedTitle}
					content={formData.content}
				/>
				<div className="flex flex-row gap-6">
					<FormBtn
						type="submit"
						className="bg-amber-500 hover:bg-amber-600 text-white"
					>
						<IoMdSave /> Save Diary
					</FormBtn>

					<FormBtn
						type="button"
						onClick={handleClear}
						className="bg-amber-500 hover:bg-amber-600 text-white"
					>
						<SiCcleaner /> Clear
					</FormBtn>
				</div>
			</form>
		</div>
	);
};

export default WriteForm;
