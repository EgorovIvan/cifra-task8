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

    return (
        <div className={'picker'}>
            <h4 className={'picker__title'}>периоду</h4>
            <div className={'picker__item'}>
                <label
                    htmlFor="startDate"
                    className={'picker__name'}
                >Start Date:</label>
                <input
                    type="date"
                    id="startDate"
                    className={'picker__input'}
                    value={filterByStartDate}
                    onChange={handleStartDateChange}
                />
            </div>

            <div className={'picker__item'}>
                <label
                    htmlFor="endDate"
                    className={'picker__name'}
                >End Date:</label>
                <input
                    type="date"
                    id="endDate"
                    className={'picker__input'}
                    value={filterByEndDate}
                    onChange={handleEndDateChange}
                />
            </div>

            {/*<div>*/}
            {/*    {isValidDateRange ? (*/}
            {/*        <p>*/}
            {/*            Selected range: {filterByStartDate} to {filterByEndDate}*/}
            {/*        </p>*/}
            {/*    ) : (*/}
            {/*        <p style={{ color: 'red' }}>Invalid date range</p>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
};

export default DateRangePicker;
