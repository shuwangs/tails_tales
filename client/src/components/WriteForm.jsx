import FormDiv from "./ui/FormDiv";
const WriteForm = () => {
    return (
        <form>
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
    )
}

export default WriteForm;