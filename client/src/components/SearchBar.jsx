import FormInput from "./ui/FormInput.jsx";
import GeneralContainer from "./ui/GeneralContainer";

const SearchBar = () => {
	return (
		<GeneralContainer className="">
			<FormInput type="text" placeholder="Seaching for diary" />
		</GeneralContainer>
	);
};

export default SearchBar;
