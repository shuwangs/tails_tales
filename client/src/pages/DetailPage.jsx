import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEntries } from "../contexts/EntriesContext.jsx";
import MainLayout from "../layout/MainLayout.jsx";
import DetailCard from "../components/DetailCard.jsx";
const DetailPage = () => {
	const { id } = useParams();
	const { entries } = useEntries();

	const selectedEntry = entries.find((entry) => entry.id === Number(id));

	useEffect(() => {
		console.log("selectedEntry  is: ", selectedEntry);
	}, [selectedEntry]);

	return (
		<MainLayout>
			<DetailCard entry={selectedEntry} />
		</MainLayout>
	);
};

export default DetailPage;
