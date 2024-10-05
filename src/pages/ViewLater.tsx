import * as React from "react";
import {useVideoStore} from "../store/useVideoStore.ts";
import YouTube from "react-youtube";
import moment from 'moment';
import ToggleSwitches from "../components/ToggleSwitches.tsx";
import {Checkbox} from "./AnimeList.tsx";
import {useEffect, useState} from "react";
import Pagination from "../components/Pagination.tsx";

const ViewLater: React.FC = () => {

    const { videoList, removeFromVideoList, sortByRating, sortByDate, currentPage, totalPages, setCurrentPage} = useVideoStore();
    const sortCheckbox: Checkbox[] = [
        {id: 1, name: 'по рейтингу'},
        {id: 2, name: "по дате"}
    ];

    // Состояния для хранения выделенных чекбоксов
    const [selectedSortCheckboxes, setSelectedSortCheckboxes] = useState<string[]>([]);

    // Функция для обработки изменения чекбоксов жанров
    const handleSortCheckboxChange = (id: number): void => {

        if (selectedSortCheckboxes.includes(String(id))) {
            // Если чекбокс уже выбран, убираем его из массива
            setSelectedSortCheckboxes(selectedSortCheckboxes.filter(item => item !== String(id)));
        } else {
            // Если чекбокс не выбран, добавляем его в массив
            setSelectedSortCheckboxes([...selectedSortCheckboxes, String(id)]);

            const findRating = selectedSortCheckboxes.find(item => item === '1')
            const findDate = selectedSortCheckboxes.find(item => item === '2')

            if ((findRating && id === 2) || (findDate && id === 1)) {
                sortByDate()
                sortByRating()
            } else if (id === 2) {
                sortByDate()
            } else if (id === 1) {
                sortByRating()
            }
        }

    };

    const handleRemoveVideo = (id: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        removeFromVideoList(id)
    }

    return (
        <div className={'video-later'}>
            <div className="video-later__list">
                    <div className="video-later__list-sort">
                        <h3 className="video-later__list-title">Сортировать</h3>
                        <ToggleSwitches
                            placeholder={''}
                            values={sortCheckbox}
                            checked={selectedSortCheckboxes}
                            onChange={handleSortCheckboxChange}
                        />
                    </div>

                {videoList.slice((currentPage - 1)*7, (currentPage - 1)*7 + 7).map((videoItem) => (
                    <div  key={videoItem.id} className="video-later__item">
                        <YouTube
                            videoId={videoItem.video_id}
                            className={'anime-item__main-wrapper'}
                            iframeClassName={'anime-item__main-iframe'}
                            title={videoItem.url}
                        />
                        <h4 className={'video-later__item-title'}>{videoItem.title}</h4>
                        <p className={'video-later__item-text'}>
                            Rating: <span
                            className={`${videoItem.rating < 4 ? 'red' : videoItem.rating > 7 ? 'green' : 'yellow'}`}>
                                     {videoItem.rating ? videoItem.rating : 0}
                                </span>
                        </p>
                        <p className={'video-later__item-text'}>{moment(videoItem.date).format('DD/MM/YYYY hh:mm:ss')}</p>

                        <button
                            className="video-later__item-btn"
                            onClick={handleRemoveVideo(String(videoItem.id))}>
                            Удалить видео из ПП
                        </button>
                    </div>
                ))}

            </div>

            {totalPages > 1 ? <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            /> : ''}
        </div>
        )
}

export default ViewLater;
