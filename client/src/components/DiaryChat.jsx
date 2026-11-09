import React, { useState } from "react";
import { IoPaw } from "react-icons/io5";
import ChatWindow from "./ChatWindow.jsx";

const DiaryChat = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([]);
	return (
		<div>
			<button
				type="button"
				aria-label="Ask Diary"
				onClick={() => setIsOpen(!isOpen)}
				className="fixed bottom-6 right-6 z-40 cursor-pointer border-0 
                bg-transparent p-2 text-amber-700 drop-shadow-lg transition-transform 
                hover:scale-110 hover:text-amber-600 focus-visible:outline-2 
                focus-visible:outline-offset-4 focus-visible:outline-amber-700"
			>
				{isOpen ? "Close" : "Ask Diary"}
				<IoPaw size={56} aria-hidden="true" />
			</button>

			{isOpen && (
				<ChatWindow
					onClose={() => setIsOpen(false)}
					messages={messages}
					setMessages={setMessages}
				/>
			)}
		</div>
	);
};

export default DiaryChat;
