import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEntries } from "../contexts/EntriesContext.jsx";
import { toast } from "react-toastify";
import GeneralContainer from "./ui/GeneralContainer";
import { getMoodIcon } from "../utils/getIcons";
import AiDiv from "./ui/AiDiv.jsx";
import AiBtn from "./ui/AiBtn.jsx";
import FormBtn from "./ui/FormBtn.jsx";
import DeleteBtn from "./ui/DeleteBtn.jsx";
import {
    LuWandSparkles,
    LuTrash2,
    LuArrowLeftToLine,
    LuCalendarHeart,
} from "react-icons/lu";

const DetailCard = ({ entry }) => {
    const navigate = useNavigate();
    const { deleteEntryHandler, error, loading } = useEntries();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const handleDeleteEntry = async (entry_id) => {
        try {
            await deleteEntryHandler(Number(entry_id));

            navigate("/entries", {
                state: { message: "Diary deleted successfully 😿" },
            })


        } catch (err) {
            console.error("Delete failed:", err);
            toast.error(err.message, {
                position: "top-right",
            }
            );
        }
    };
    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading</p>;

    return (
        <GeneralContainer className="mt-10 w-80/100 mx-auto gap-6 ">
            <div className="flex justify-between items-center bg-amber-300 p-8">
                <div className="flex flex-col gap-4">
                    <h2 className="font-heading text-4xl text-amber-800">
                        {entry.title}{" "}
                    </h2>
                    <p className="flex gap-2 text-xl">
                        {" "}
                        <LuCalendarHeart />{" "}
                        <span>
                            {new Date(entry.entry_date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                    </p>
                </div>
                <div className="text-2xl">
                    <h2 className="text-5xl">{getMoodIcon(entry.mood)}</h2>
                </div>
            </div>
            <div className="bg-white flex flex-col gap-6">
                <div className="px-8 text-mono text-amber-800 text-2xl px-2 line-">
                    {entry.content}
                </div>
                <div className="px-8">
                    <AiDiv className="flex flex-col gap-4">
                        <h3 className="flex gap-2 text-xl text-violet-700 font-bold">
                            {" "}
                            <LuWandSparkles /> <span>AI Tools</span>{" "}
                        </h3>
                        <AiBtn className="text-lg"> Translate to Chinese</AiBtn>
                    </AiDiv>
                </div>

                <div className="flex flex-row  gap-6 px-8 pb-6">
                    <FormBtn className="bg-amber-400 hover:bg-amber-500 text-white flex-[2] text-center">
                        Edit
                    </FormBtn>
                    <DeleteBtn
                        onClick={() => setShowDeleteConfirm(true)}
                        className="bg-amber-500 hover:bg-amber-600 text-red-600 text-xl flex-[1] justify-center"
                    >
                        <LuTrash2 /> Delete
                    </DeleteBtn>
                    <Link
                        to="/entries"
                        className="flex items-center justify-center px-6 rounded-full bg-gray-200 hover:bg-gray-300 text-black text-xl flex-[1]"
                    >
                        <LuArrowLeftToLine /> Back
                    </Link>
                </div>

                {showDeleteConfirm && (
                    <div className="rounded-lg border-2 border-red-500 mx-6 p-4 mb-6">
                        <h3 className="text-red-700 mb-4">
                            Are you sure you want to delete this diary? 😿
                        </h3>

                        <div className="flex gap-6">
                            <DeleteBtn onClick={() => handleDeleteEntry(Number(entry.id))}>
                                Yes, Delete
                            </DeleteBtn>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="bg-gray-200 hover:bg-gray-400 px-6 rounded-full"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </GeneralContainer>
    );
};
export default DetailCard;
