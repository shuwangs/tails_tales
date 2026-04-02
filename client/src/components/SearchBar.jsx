import GeneralContainer from "./ui/GeneralContainer";

const SearchBar = () => {
	return (
		<GeneralContainer className="mt-6">
			<input type="text" placeholder="Seaching for diary" />
		</GeneralContainer>
	);
};

export default SearchBar;
