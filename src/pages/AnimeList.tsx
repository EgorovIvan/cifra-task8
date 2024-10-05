import * as React from 'react';
import {useEffect, useState} from 'react';
import {AnimeState, useAnimeStore} from '../store/useAnimeStore.ts';
import DateRangePicker from "../components/DateRangePicker.tsx";
import {Link} from "react-router-dom";
import SearchInput from "../components/SearchInput.tsx";
import Select from "../components/Select.tsx";
import RadioButtonGroup from "../components/RadioButtonGroup.tsx";
import ToggleSwitches from "../components/ToggleSwitches.tsx";
import Pagination from "../components/Pagination.tsx";
import {useVideoStore} from "../store/useVideoStore.ts";
import ModalVideoAdd from "../components/ModalVideoAdd.tsx";
import ReactLoading from "react-loading";

export interface Checkbox {
    id: number;
    name: string;
}

export interface Sort {
    name: string;
    text: string;
}

const AnimeList: React.FC = () => {

    const props: AnimeState = useAnimeStore();
    const {videoList, fetchVideoItem, clearVideoItem, removeFromVideoList} = useVideoStore();

    const [showModal, setShowModal] = useState(false)

    const genresCheckbox: Checkbox[] = [
        {id: 1, name: "Action"},
        {id: 4, name: "Comedy"},
        {id: 5, name: "Avant Garde"},
        {id: 8, name: "Drama"},
        {id: 24, name: "Sci-Fi"},
        {id: 41, name: "Suspense"}
    ];

    const genresExcludeCheckbox: Checkbox[] = [
        {id: 1, name: "Action"},
    ];

    const producersCheckbox: Checkbox[] = [
        {id: 16, name: 'TV Tokyo'},
        {id: 53, name: "Dentsu"},
        {id: 139, name: "Nihon Ad Systems"},
        {id: 517, name: "Asmik Ace"},
        {id: 717, name: "TV Tokyo Music"},
        {id: 1365, name: "Shueisha"}
    ];

    const orderList: Sort[] = [
        {name: 'popularity', text: 'по популярности'},
        {name: 'score', text: 'по оценке'},
        {name: 'scored_by', text: 'по количеству оценок'},
        {name: 'favorites', text: 'по количеству favorites'},
        {name: 'episodes', text: 'по количеству эпизодов'},
        {name: 'start_date', text: 'по начальной дате'},
        {name: 'end_date', text: 'по конечной дате'}
    ]

    const sortList: Sort[] = [
        {name: 'asc', text: 'на увеличение '},
        {name: 'desc', text: 'на уменьшение'}
    ]

    const typeList: Sort[] = [
        {name: 'tv', text: 'tv'},
        {name: 'movie', text: 'movie'},
        {name: 'ova', text: 'ova'},
        {name: 'special', text: 'special'},
        {name: 'music', text: 'music'},
        {name: 'cm', text: 'cm'},
        {name: 'pv', text: 'pv'},
        {name: 'tv_special', text: 'tv_special'}
    ]

    const ratingList: Sort[] = [
        {name: 'g', text: 'g'},
        {name: 'pg', text: 'pg'},
        {name: 'pg13', text: 'pg13'},
        {name: 'r17', text: 'r17'},
        {name: 'r', text: 'r'},
        {name: 'rx', text: 'rx'}
    ]

    const statusList: Sort[] = [
        {name: 'airing', text: 'airing'},
        {name: 'complete', text: 'complete'},
        {name: 'upcoming', text: 'upcoming'}
    ]

    // Состояния для хранения выделенных чекбоксов
    const [selectedGenresCheckboxes, setSelectedGenresCheckboxes] = useState<string[]>([]);
    const [selectedGenresExcludeCheckboxes, setSelectedGenresExcludeCheckboxes] = useState<string[]>([]);
    const [selectedProducersCheckboxes, setSelectedProducersCheckboxes] = useState<string[]>([]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        props.updateSearchBy(e.target.value);
    };

    const handleSearchSend = (): void => {
        props.fetchAnimeList();
    };

    const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        props.updateOrderBy(e.target.value);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        props.updateSortBy(e.target.value);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        props.updateFilterByType(e.target.value);
    };

    const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        props.updateFilterByRating(e.target.value);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        props.updateFilterByStatus(e.target.value);
    };

    // Функция для обработки изменения чекбоксов жанров
    const handleGenresCheckboxChange = (id: number): void => {

        if (selectedGenresCheckboxes.includes(String(id))) {
            // Если чекбокс уже выбран, убираем его из массива
            setSelectedGenresCheckboxes(selectedGenresCheckboxes.filter(item => item !== String(id)));
        } else {
            // Если чекбокс не выбран, добавляем его в массив
            setSelectedGenresCheckboxes([...selectedGenresCheckboxes, String(id)]);
        }
    };

    // Функция для обработки изменения чекбоксов исключенных жанров
    const handleGenresExcludeCheckboxChange = (id: number): void => {

        if (selectedGenresExcludeCheckboxes.includes(String(id))) {
            setSelectedGenresExcludeCheckboxes(selectedGenresExcludeCheckboxes.filter(item => item !== String(id)));
        } else {
            setSelectedGenresExcludeCheckboxes([...selectedGenresExcludeCheckboxes, String(id)]);
        }
    };

    // Функция для обработки изменения чекбоксов продюсеров
    const handleProducersCheckboxChange = (id: number): void => {

        if (selectedProducersCheckboxes.includes(String(id))) {
            setSelectedProducersCheckboxes(selectedProducersCheckboxes.filter(item => item !== String(id)));
        } else {
            setSelectedProducersCheckboxes([...selectedProducersCheckboxes, String(id)]);
        }
    };

    // Функция применения всех изменений в чекбоксах
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        props.updateFilterByGenres(selectedGenresCheckboxes.length > 0 ? selectedGenresCheckboxes.join(', ') : '');
        props.updateFilterByGenresExclude(selectedGenresExcludeCheckboxes.length > 0 ? selectedGenresExcludeCheckboxes.join(', ') : '');
        props.updateFilterByProducers(selectedProducersCheckboxes.length > 0 ? selectedProducersCheckboxes.join(', ') : '');
        props.fetchAnimeList();
    }


    const handleModalOpen = (id: string, title: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        fetchVideoItem(id, title)
        setShowModal(true)
    }

    const handleModalClose = (): void => {
        clearVideoItem()
        setShowModal(false)
    }

    const handleRemoveVideo = (id: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        removeFromVideoList(id)
    }

    // Проверка наличия видео в массиве ПП
    const isVideo = (anime_id: number) => {
        const find = videoList.find(item => item.id === String(anime_id))
        return !find
    }

    useEffect((): void => {
        props.fetchAnimeList()
    }, [props.orderBy, props.sortBy]);

    return (
        <div className="anime-list-container">


            <div className="search-wrapper">


                <SearchInput
                    placeholder="Search by name"
                    value={props.searchBy}
                    onChange={handleSearchChange}
                    onClick={handleSearchSend}
                />

                <Select
                    name={"order-by"}
                    placeholder={'Сортировать по'}
                    disabled={false}
                    values={orderList}
                    onChange={handleOrderChange}
                />

                <Select
                    name={"sort-by"}
                    placeholder={'Направление сортировки'}
                    disabled={!props.orderBy}
                    values={sortList}
                    onChange={handleSortChange}
                />
            </div>

            <div className="anime-list">

                <div className="anime-list__filter">
                    <h3 className="anime-list__filter-title">
                        Фильтровать по
                    </h3>

                    <RadioButtonGroup
                        name="type"
                        placeholder={'типу:'}
                        values={typeList}
                        onChange={handleTypeChange}
                    />

                    <RadioButtonGroup
                        name="rating"
                        placeholder={'рейтингу:'}
                        values={ratingList}
                        onChange={handleRatingChange}
                    />

                    <RadioButtonGroup
                        name="status"
                        placeholder={'статусу:'}
                        values={statusList}
                        onChange={handleStatusChange}
                    />

                    <ToggleSwitches
                        placeholder={'жанрам:'}
                        values={genresCheckbox}
                        checked={selectedGenresCheckboxes}
                        onChange={handleGenresCheckboxChange}
                    />

                    <ToggleSwitches
                        placeholder={'исключенным жанрам:'}
                        values={genresExcludeCheckbox}
                        checked={selectedGenresExcludeCheckboxes}
                        onChange={handleGenresExcludeCheckboxChange}
                    />

                    <ToggleSwitches
                        placeholder={'продюсерам:'}
                        values={producersCheckbox}
                        checked={selectedProducersCheckboxes}
                        onChange={handleProducersCheckboxChange}
                    />

                    <DateRangePicker/>

                    <div className={'anime-list__filter-btns'}>
                        <button className={'filter-btn'} onClick={handleSubmit}>
                            применить
                        </button>
                        <button className={'clear-btn'} onClick={handleSubmit}>очистить</button>
                    </div>

                </div>

                {
                props.animeList.map((anime) => (

                    <div key={anime.mal_id} className="anime-card">

                        <Link to={`/anime-item/${anime.mal_id}`}>
                            <img src={anime.images.webp.image_url} alt={anime.title}/>
                            <div className="anime-card__info">
                                <h4 className="anime-card__info-title">{anime.title}</h4>
                                <p>популярность: {anime.popularity ? anime.popularity : 0}</p>
                                <p>
                                    оценка: <span
                                    className={`${anime.score < 4 ? 'red' : anime.score > 7 ? 'green' : 'yellow'}`}>
                                     {anime.score ? anime.score : 0}
                                </span>
                                </p>
                                <p>кол-во оценок: {anime.scored_by ? anime.scored_by : 0}</p>
                                <p>кол-во favorites: {anime.favorites ? anime.favorites : 0}</p>
                                <p>кол-во эпизодов: {anime.episodes ? anime.episodes : 0}</p>
                                <p>тип: {anime.type}</p>
                                {/*<p>рейтинг: {anime.rating}</p>*/}
                                {/*<p>статус: {anime.status}</p>*/}
                                {/*<p>*/}
                                {/*    жанры: {anime.genres.map((genre, index) => (*/}
                                {/*    <span*/}
                                {/*        key={genre.mal_id}>{genre.name}{(anime.genres.length - 1) !== index ? ', ' : ''}</span>*/}
                                {/*))}*/}
                                {/*</p>*/}
                                {/*<p>*/}
                                {/*    исключенные жанры: {anime.explicit_genres.map((genre, index) => (*/}
                                {/*    <span*/}
                                {/*        key={genre.mal_id}>{genre.name}{(anime.genres.length - 1) !== index ? ', ' : ''}</span>*/}
                                {/*))}*/}
                                {/*</p>*/}
                                {/*<p>*/}
                                {/*    продюсеры: {anime.producers.map((producer, index) => (*/}
                                {/*    <span*/}
                                {/*        key={producer.mal_id}>{producer.name}{(anime.producers.length - 1) !== index ? ', ' : ''}</span>*/}
                                {/*))}*/}
                                {/*</p>*/}

                                {
                                    isVideo(anime.mal_id) ?
                                    <button className="anime-card__info-btn"
                                            onClick={handleModalOpen(String(anime.mal_id), anime.title)}>
                                        Добавить видео в ПП
                                    </button> :
                                    <button className="anime-card__info-btn"
                                            onClick={handleRemoveVideo(String(anime.mal_id))}>
                                        Удалить видео из ПП
                                    </button>
                                }

                            </div>
                        </Link>
                    </div>

                ))}
            </div>

            <Pagination
                currentPage={props.currentPage}
                totalPages={props.totalPages}
                setCurrentPage={props.setCurrentPage}
                fetchDate={props.fetchAnimeList}
            />

            {showModal ?
                <ModalVideoAdd
                    close={handleModalClose}
                /> : ''}
        </div>


    );
};

export default AnimeList;
