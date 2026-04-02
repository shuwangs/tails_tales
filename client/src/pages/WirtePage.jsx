import GeneralContainer from "../components/ui/GeneralContainer";
import WriteForm from "../components/WriteForm.jsx";
import MainLayout from "../layout/MainLayout";

const WritePage = () => {
	return (
		<MainLayout>
			<GeneralContainer className="mt-10 p-8">
				<WriteForm />
			</GeneralContainer>
		</MainLayout>
	);
};

export default WritePage;
