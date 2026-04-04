import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { moodOpts, weatherOpts } from "../utils/ConstantOptions.js";
import { getMoodIcon, getWeatherIcon } from "../utils/getIcons.js";
import { useEntries } from "../contexts/EntriesContext.jsx";
import FormDiv from "./ui/FormDiv";
import FormBtn from "./ui/FormBtn";
import AiCard from "./AiCard";
import FormSelect from "./ui/FormSelect.jsx";
import FormLabel from "./ui/FormLabel.jsx";
import FormInput from "./ui/FormInput.jsx";
import { SiCcleaner } from "react-icons/si";
import { IoMdSave } from "react-icons/io";
import { TfiThought } from "react-icons/tfi";
import { TbMoodCheck } from "react-icons/tb";

const WriteForm = () => {
	const navigate = useNavigate();
	const { petId, error, loading, addEntry } = useEntries();

	const initalForm = {
		mood: "happy",
		weather: "sunny",
		title: "",
		entry_date: "",
		content: "",
	};

	const [formData, setFormData] = useState(initalForm);

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
			console.log("Submitting...");
			await addEntry(petId, formData);

			console.log("Success, navigating...");
			setFormData(initalForm);
			navigate("/entries");
		} catch (error) {
			console.error("Submit failed:", error);
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
								<option value={mood.value}>
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
								<option value={weather.value}>
									{" "}
									{weather.label} {getWeatherIcon(weather.value)}
								</option>
							))}
						</FormSelect>
					</div>

					<div>
						<FormLabel htmlFor="entry_date">🗓️</FormLabel>
						<FormInput onChange={handleChange} name="entry_date" type="date" />
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
				<AiCard />
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
