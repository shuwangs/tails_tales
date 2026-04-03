import { moodOpts, weatherOpts } from "../utils/ConstantOptions";
import FormDiv from "./ui/FormDiv";
import FormBtn from "./ui/FormBtn";
import AiCard from "./AiCard";
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
            <h1>haven't think of a header</h1>
            <form
                className="flex flex-col gap-4">
                <div className="flex flex-row gap-6">
                    <div className="flex flex-row gap-2">
                        <label htmlFor="mood" >Mood</label>
                        <select name="mood" value={initalForm.mood}>
                            {moodOpts.map((mood) => (
                                <option value={mood.value}> {mood.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-row gap-2">
                        <label htmlFor="weather">Weather</label>
                        <select name="weather" value={initalForm.weather}>
                            {weatherOpts.map((weather) => (
                                <option value={weather.value}> {weather.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <FormDiv className="flex flex-col bg-amber-50">
                        <label htmlFor="title">Title </label>
                        <input name="title" placeholder="Give your memory a title..." />
                    </FormDiv>
                    <FormDiv className="flex flex-col bg-amber-50">
                        <label htmlFor="title">Story </label>
                        <textarea name="title"
                            className="w-full h-60 max-h-80"
                            placeholder="What's on your mind today Bobo?"
                        />
                    </FormDiv>
                </div>


                {/*  AI suggestion Card */}
                <AiCard />
                <div className="flex flex-row">
                    <FormBtn className='flex px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white' >📔 Save Diary</FormBtn>
                    <FormBtn>Clear</FormBtn>
                </div>
            </form>
        </div >
    );
};

export default WriteForm;
