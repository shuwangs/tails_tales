import MainLayout from "../layout/MainLayout";
import GeneralContainer from "../components/ui/GeneralContainer";
import WriteForm from "../components/WriteForm.jsx"
const WritePage = () => {
	return (
		<MainLayout>

			<GeneralContainer className="mt-10 p-8">
				<h1>haven't think of a header</h1>
				<WriteForm />
			</GeneralContainer>
		</MainLayout >
	);
};

export default WritePage;
