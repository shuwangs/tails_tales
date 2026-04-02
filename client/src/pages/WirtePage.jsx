import MainLayout from "../layout/MainLayout";
import GeneralContainer from "../components/ui/GeneralContainer";
import WriteForm from "../components/WriteForm.jsx"
const WritePage = () => {
	return (
		<MainLayout>

			<GeneralContainer className="mt-10 p-8">
				<WriteForm />
			</GeneralContainer>
		</MainLayout >
	);
};

export default WritePage;
