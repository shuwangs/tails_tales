import { ToastContainer } from 'react-toastify';
import AiCard from "../components/AiCard.jsx";
import GeneralContainer from "../components/ui/GeneralContainer";
import WriteForm from "../components/WriteForm.jsx";
import MainLayout from "../layout/MainLayout";

const WritePage = () => {
	return (
		<MainLayout>
			<div className="flex gap-4 mx-15">
				<GeneralContainer className="mt-10 p-8 flex-[3]">
					<WriteForm />
				</GeneralContainer>
			</div>
		</MainLayout>
	);
};

export default WritePage;
