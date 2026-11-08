import { useState } from "react";
import { IoIosSend } from "react-icons/io";

const ChatWindow = ({ onClose, messages, setMessages }) => {
    const [message, setMessage] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();

        const text = message.trim();
        if (!text) return;

        setMessages((previous) => [...previous, text]);
        setMessage("");
    }

    return (
        <div className="fixed top-24 right-4 z-50 bg-white">

            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="diary-chat-title"
                className="flex h-[80dvh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-amber-200 bg-amber-50 shadow-xl"
            >
                <header className="flex items-center justify-between border-b border-amber-200 px-5 py-4">
                    <h2
                        id="diary-chat-title"
                        className="text-lg font-semibold text-amber-900"
                    >
                        Diary Chat 🐾
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close chat"
                        className="rounded-full px-3 py-1 text-xl text-amber-800 hover:bg-amber-200"
                    >
                        ×
                    </button>
                </header>

                {/* 对话区域 */}
                <div className="flex-1 overflow-y-auto p-5">
                    {messages.length === 0 && (
                        <p className="text-amber-800">
                            What would you like to remember about your pet?
                        </p>
                    )}
                    {messages.map((text, index) => (
                        <div key={index} className="flex flex-col gap-2 mb-2">
                            <div className="flex items-end justify-end">

                                <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-sm bg-amber-200 px-4 py-2 text-amber-900">
                                    {text}
                                </p>
                            </div>

                            {/* Asistant answers placeholder */}

                            <div className="flex items-start justify-start gap-2">
                                <span aria-hidden="true">🐾</span>

                                <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-amber-200 bg-white px-4 py-2">
                                    <p className="text-sm font-semibold text-amber-900">
                                        Diary Assistant
                                    </p>
                                    <p className="mt-1 text-amber-700">
                                        Example response
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 输入区域 */}

                < div >
                    <form
                        onSubmit={onSubmit}
                        className="flex items-center border-t border-amber-200 p-4 gap-2">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-1 rounded-full border border-amber-300 px-4 py-2 text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                        <button
                            type="submit"
                            disabled={!message.trim()}
                            className="rounded-xl bg-amber-200 px-4 py-2 text-amber-900 
                            hover:bg-amber-300 
                            disabled:cursor-not-allowed 
                            disabled:opacity-50"
                        >
                            <IoIosSend />
                        </button>
                    </form>
                </div>

            </section>
        </div>
    );
}


export default ChatWindow;