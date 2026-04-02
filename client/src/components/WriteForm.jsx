import FormDiv from "./ui/FormDiv";
const WriteForm = () => {

    return (
        <div>
            <h1>haven't think of a header</h1>
            <form>

                <FormDiv className="flex flex-row">
                    <div>
                        <h3>Mood</h3>

                    </div>
                    <div>
                        <h3>Weather</h3>
                    </div>
                </FormDiv>

                <div className="flex flex-col">
                    <FormDiv className="flex flex-col">
                        <label htmlFor="title">Title </label>
                        <input name="title" placeholder="Give your memory a title..." />

                    </FormDiv>
                    <FormDiv className="flex flex-col">
                        <label htmlFor="title">Story </label>
                        <input name="title" placeholder="What's on your mind today Bobo?" />
                    </FormDiv>


                </div>

            </form>
        </div>

    )
}

export default WriteForm;