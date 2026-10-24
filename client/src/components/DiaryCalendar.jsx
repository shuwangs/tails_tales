
import { useState } from "react";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const DiaryCalendar = ({ selectedDate, onSelectDate }) => {
    const [visibleMonth, setVisibleMonth] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
    });

    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();

    // 当月第一天是星期几：Sunday = 0
    const firstWeekday = new Date(year, month, 1).getDay();

    // 下个月的第 0 天，就是本月最后一天
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const todayKey = toDateKey(new Date());

    const changeMonth = (offset) => {
        setVisibleMonth((current) =>
            new Date(current.getFullYear(), current.getMonth() + offset, 1)
        );
    };

    return (
        <section
            aria-label="Diary calendar"
            className="w-full rounded-2xl border border-amber-200 bg-white p-4 shadow-sm"
        >
            <div className="mb-4 flex items-center justify-between">
                <button
                    type="button"
                    aria-label="Previous month"
                    onClick={() => changeMonth(-1)}
                    className="rounded-lg px-3 py-2 hover:bg-amber-100"
                >
                    ←
                </button>

                <h2 aria-live="polite" className="font-bold text-amber-900">
                    {visibleMonth.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                    })}
                </h2>

                <button
                    type="button"
                    aria-label="Next month"
                    onClick={() => changeMonth(1)}
                    className="rounded-lg px-3 py-2 hover:bg-amber-100"
                >
                    →
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
                {weekdays.map((day) => (
                    <div key={day} className="py-2 text-sm text-amber-800">
                        {day}
                    </div>
                ))}

                {Array.from({ length: firstWeekday }, (_, index) => (
                    <div key={`empty-${index}`} aria-hidden="true" />
                ))}

                {Array.from({ length: daysInMonth }, (_, index) => {
                    const day = index + 1;
                    const dateKey = toDateKey(new Date(year, month, day));
                    const isSelected = selectedDate === dateKey;
                    const isToday = todayKey === dateKey;

                    return (
                        <button
                            key={dateKey}
                            type="button"
                            aria-label={dateKey}
                            aria-pressed={isSelected}
                            aria-current={isToday ? "date" : undefined}
                            onClick={() => onSelectDate(dateKey)}
                            className={`min-h-11 rounded-lg border ${isSelected
                                    ? "border-amber-600 bg-amber-500 text-white"
                                    : "border-transparent text-amber-900 hover:bg-amber-100"
                                } ${isToday ? "font-bold underline" : ""}`}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </section>
    );
};

export default DiaryCalendar;
