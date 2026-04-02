import { moodOpts, weatherOpts } from "../utils/ConstantOptions";
import FormDiv from "./ui/FormDiv";
import FormBtn from "./ui/FormBtn";
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
                <FormDiv className="flex flex-row">
                    <div>
                        <label htmlFor="mood" >Mood</label>
                        <select name="mood" value={initalForm.mood}>
                            {moodOpts.map((mood) => (
                                <option value={mood.value}> {mood.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="weather">Weather</label>
                        <select name="weather" value={initalForm.weather}>
                            {weatherOpts.map((weather) => (
                                <option value={weather.value}> {weather.label}</option>
                            ))}
                        </select>
                    </div>
                </FormDiv>

                <div className="flex flex-col">
                    <FormDiv className="flex flex-col">
                        <label htmlFor="title">Title </label>
                        <input name="title" placeholder="Give your memory a title..." />
                    </FormDiv>
                    <FormDiv className="flex flex-col">
                        <label htmlFor="title">Story </label>
                        <textarea name="title"
                            className="w-full h-2/3"
                            placeholder="What's on your mind today Bobo?"
                        />
                    </FormDiv>
                </div>

                <div>
                    <FormBtn>Save</FormBtn>
                    <FormBtn>Clear</FormBtn>
                </div>
            </form>
        </div >
    );
};

export default WriteForm;
