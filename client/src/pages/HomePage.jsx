import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import EntryList from "../components/EntryList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import DiaryCalendar from "../components/DiaryCalendar.jsx";
import MainLayout from "../layout/MainLayout";

const HomePage = () => {
	const location = useLocation();
	const [selectedDate, setSelectedDate] = useState("");
	useEffect(() => {
		if (location.state?.message) {
			toast.success(location.state.message, {
				position: "top-right",
				autoClose: 1500,
			});
		}
	}, [location.state]);
	return (
		<MainLayout>
			<ToastContainer />
			<div className="flex flex-col gap-6 px-4 pb-8 sm:px-6">
				<h1 className="text-amber-900">Bobo’s Diary</h1>
				<SearchBar />
				<div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
					<div className="min-w-0">
						<DiaryCalendar
							selectedDate={selectedDate}
							onSelectDate={setSelectedDate}
						/>
						{selectedDate && (
							<div className="mt-3 flex items-center justify-between gap-2">
								<p role="status" className="text-sm text-amber-800">
									Selected date: {selectedDate}
								</p>
								<button
									type="button"
									onClick={() => setSelectedDate("")}
									className="text-sm text-amber-800 underline"
								>
									All dates
								</button>
							</div>
						)}
					</div>
					<section className="min-w-0" aria-label="Diary entries">
						<h2 className="mb-4 text-xl font-semibold text-amber-900">Diary entries</h2>
						<EntryList selectedDate={selectedDate} />
					</section>
				</div>
			</div>
		</MainLayout>
	);
};

export default HomePage;
