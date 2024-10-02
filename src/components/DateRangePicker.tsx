import * as React from 'react';
import {useEffect, useState} from 'react';
import {useAnimeStore} from "../store/useAnimeStore.ts";

const DateRangePicker: React.FC = () => {

    const {filterByStartDate, filterByEndDate, updateFilterByStartDate, updateFilterByEndDate, fetchAnimeList} = useAnimeStore();
    // Состояние для хранения выбранных дат
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    // Обработчики изменения полей
    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFilterByStartDate(e.target.value);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFilterByEndDate(e.target.value);
    };

    // Валидация диапазона дат
    const isValidDateRange = startDate && endDate && startDate <= endDate;


    useEffect(() => {
        fetchAnimeList()
    }, [filterByStartDate, filterByEndDate]);

    return (
        <div>
            <h2>Select Date Range</h2>
            <div>
                <label htmlFor="startDate">Start Date:</label>
                <input
                    type="date"
                    id="startDate"
                    value={filterByStartDate}
                    onChange={handleStartDateChange}
                />
            </div>

            <div>
                <label htmlFor="endDate">End Date:</label>
                <input
                    type="date"
                    id="endDate"
                    value={filterByEndDate}
                    onChange={handleEndDateChange}
                />
            </div>

            <div>
                {isValidDateRange ? (
                    <p>
                        Selected range: {filterByStartDate} to {filterByEndDate}
                    </p>
                ) : (
                    <p style={{ color: 'red' }}>Invalid date range</p>
                )}
            </div>
        </div>
    );
};

export default DateRangePicker;
