import GeneralContainer from "./ui/GeneralContainer";
import FormInput from "./ui/FormInput.jsx";
const SearchBar = () => {
	return (
		<GeneralContainer className="">
			<FormInput type="text" placeholder="Seaching for diary" />
		</GeneralContainer>
	);
};

export default SearchBar;
