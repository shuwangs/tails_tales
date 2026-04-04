import { useParams } from "react-router-dom";
import DetailCard from "../components/DetailCard.jsx";
import { useEntries } from "../contexts/EntriesContext.jsx";
import MainLayout from "../layout/MainLayout.jsx";

const DetailPage = () => {
	const { id } = useParams();
	const { entries } = useEntries();

	const selectedEntry = entries.find((entry) => entry.id === Number(id));
	const badchange = "some text"

	return (
		<MainLayout>
			<DetailCard entry={selectedEntry} />
		</MainLayout>
	);
};

export default DetailPage;
