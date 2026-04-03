import { moodOpts, weatherOpts } from "../utils/ConstantOptions.js";
import { getMoodIcon, getWeatherIcon } from "../utils/getIcons.js";
import FormDiv from "./ui/FormDiv";
import FormBtn from "./ui/FormBtn";
import AiCard from "./AiCard";
import FormSelect from "./ui/FormSelect.jsx";
import FormLabel from "./ui/FormLabel.jsx";
import FormInput from "./ui/FormInput.jsx";
import { SiCcleaner } from "react-icons/si";
import { IoMdSave } from "react-icons/io";
import { TfiThought } from "react-icons/tfi";


const WriteForm = () => {
    const initalForm = {
        mood: "",
        weather: "",
        title: "",
        entry_date: "",
        content: "",
    }
    return (
        <div>
            <h1 className="font-heading text-amber-800 pb-2 flex gap-4"><TfiThought /> <span>Another Day, Another Bobo Thought</span></h1>
            <form
                className="flex flex-col gap-4">
                <div className="flex flex-row gap-6">
                    <div className="flex flex-row gap-2 items-center">
                        <FormLabel htmlFor="mood" >Mood</FormLabel>
                        <FormSelect name="mood" value={initalForm.mood}>
                            {moodOpts.map((mood) => (
                                <option value={mood.value}> {mood.label} {getMoodIcon(mood.value)}</option>
                            ))}
                        </FormSelect>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <FormLabel htmlFor="weather">Weather</FormLabel>
                        <FormSelect name="weather" value={initalForm.weather}>
                            {weatherOpts.map((weather) => (
                                <option value={weather.value}> {weather.label} {getWeatherIcon(weather.value)}</option>
                            ))}
                        </FormSelect>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <FormDiv className="flex flex-col bg-amber-50">
                        <FormLabel htmlFor="title">Title </FormLabel>
                        <FormInput
                            className="placeholder:text-amber-400"
                            name="title" placeholder="Give your memory a title..."
                        />
                    </FormDiv>
                    <FormDiv className="flex flex-col bg-amber-50">
                        <FormLabel htmlFor="title">Story </FormLabel>
                        <textarea name="title"
                            className="w-full h-60 max-h-80 placeholder:text-amber-400 font-mono text-lg px-2 py-2"
                            placeholder="What's on your mind today Bobo?"
                        />
                    </FormDiv>
                </div>


                {/*  AI suggestion Card */}
                <AiCard />
                <div className="flex flex-row gap-6">
                    <FormBtn className='bg-amber-500 hover:bg-amber-600 text-white'><IoMdSave /> Save Diary</FormBtn>
                    <FormBtn className='bg-amber-500 hover:bg-amber-600 text-white'> <SiCcleaner /> Clear</FormBtn>
                </div>
            </form>
        </div >
    );
};

export default WriteForm;
