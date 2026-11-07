import React, { useState } from 'react';
import { IoPaw } from "react-icons/io5";
const DiaryChat = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                type="button"
                aria-label="Ask Diary"
                onClick={() => setIsOpen(!isOpen)}
                c className="fixed bottom-6 right-6 z-40 cursor-pointer border-0 
                bg-transparent p-2 text-amber-700 drop-shadow-lg transition-transform 
                hover:scale-110 hover:text-amber-600 focus-visible:outline-2 
                focus-visible:outline-offset-4 focus-visible:outline-amber-700"
            >
                {isOpen ? 'Close' : 'Ask Diary'}
                <IoPaw size={56} aria-hidden="true" />
            </button>

            {isOpen && (
                <div>
                    <p>Welcome to the Diary Chat!</p>
                </div>
            )}
        </div>
    );
}

export default DiaryChat;