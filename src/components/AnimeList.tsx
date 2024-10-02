import * as React from 'react';
import {useEffect, useState} from 'react';
import {AnimeState, useAnimeStore} from '../store/useAnimeStore.ts';
import DateRangePicker from "./DateRangePicker.tsx";
import {Link} from "react-router-dom";
import SearchInput from "./SearchInput.tsx";

interface Checkbox {
    id: number;
    name: string;
}

const AnimeList: React.FC = () => {

    const props: AnimeState = useAnimeStore();

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

    // Состояния для хранения выделенных чекбоксов
    const [selectedGenresCheckboxes, setSelectedGenresCheckboxes] = useState<string[]>([]);
    const [selectedGenresExcludeCheckboxes, setSelectedGenresExcludeCheckboxes] = useState<string[]>([]);
    const [selectedProducersCheckboxes, setSelectedProducersCheckboxes] = useState<string[]>([]);

    // const [showFilter, setShowFilter] = useState<boolean>(false);
    // const [visibleAnime, setVisibleAnime] = useState<number>(30);
    // {currentPage, searchBy, orderBy, sortBy, filterByType,
    //     updateSearchBy, updateOrderBy, updateSortBy, animeList, fetchAnimeList, updateFilterByType}
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

    const handleGenresChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        props.updateFilterByGenres(e.target.value);
        console.log()
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
    }

    useEffect((): void => {
        props.fetchAnimeList()
    }, [props.orderBy, props.sortBy, props.filterByType, props.filterByRating,
        props.filterByStatus, props.filterByGenres, props.filterByProducers]);

    // const Checkbox = ({ label, value, onChange }) => {
    //     return (
    //         <label>
    //             <input type="checkbox" checked={value} onChange={onChange} />
    //             {label}
    //         </label>
    //     );
    // };

    return (
        <div className="anime-list-container">

            <SearchInput
                placeholder="Search by name"
                value={props.searchBy}
                onChange={handleSearchChange}
                onClick={handleSearchSend}
            />

            <select
                name="order-by"
                id="order-by"

                onChange={handleOrderChange}
            >
                <option value="">default</option>
                <option value="popularity">по популярности</option>
                <option value="score">по оценке</option>
                <option value="scored_by">по количеству оценок</option>
                <option value="favorites">по количеству
                    favorites
                </option>
                <option value="episodes">по количеству эпизодов</option>
                <option value="start_date">по начальной дате</option>
                <option value="end_date">по конечной дате</option>
            </select>
            <select
                name="sort-by"
                id="sort-by"
                disabled={!props.orderBy}
                onChange={handleSortChange}
            >
                <option value="asc">на повышение</option>
                <option value="desc">на понижение</option>
            </select>



            <p>по рейтингу</p>

            <input
                type="radio"
                name="rating"
                value="g"
                onChange={handleRatingChange}
            />
            <input
                type="radio"
                name="rating"
                value="pg"
                onChange={handleRatingChange}
            />
            <input
                type="radio"
                name="rating"
                value="pg13"
                onChange={handleRatingChange}
            />

            <input
                type="radio"
                name="rating"
                value="r17"
                onChange={handleRatingChange}
            />
            <input
                type="radio"
                name="rating"
                value="r"
                onChange={handleRatingChange}
            />
            <input
                type="radio"
                name="rating"
                value="rx"
                onChange={handleRatingChange}
            />

            <p>по статусу</p>

            <input
                type="radio"
                name="status"
                value="airing"
                onChange={handleStatusChange}
            />
            <input
                type="radio"
                name="status"
                value="complete"
                onChange={handleStatusChange}
            />
            <input
                type="radio"
                name="status"
                value="upcoming"
                onChange={handleStatusChange}
            />

            <p>по периоду времени</p>

            <DateRangePicker/>

            <p>по жанрам</p>

            {genresCheckbox.map((label) => (
                <div key={label.id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedGenresCheckboxes.includes(String(label.id))}
                            onChange={() => handleGenresCheckboxChange(label.id)}
                        />
                        {label.name}
                    </label>
                </div>
            ))}

            <p>по исключенным жанрам:</p>

            {genresExcludeCheckbox.map((label) => (
                <div key={label.id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedGenresExcludeCheckboxes.includes(String(label.id))}
                            onChange={() => handleGenresExcludeCheckboxChange(label.id)}
                        />
                        {label.name}
                    </label>
                </div>
            ))}

            <p>по продюсерам:</p>

            {producersCheckbox.map((label) => (
                <div key={label.id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedProducersCheckboxes.includes(String(label.id))}
                            onChange={() => handleProducersCheckboxChange(label.id)}
                        />
                        {label.name}
                    </label>
                </div>
            ))}

            <button onClick={handleSubmit}>SEND</button>

            {/* Выводим выделенные чекбоксы */}
            <div style={{marginTop: '20px'}}>
                <h2>Selected Checkboxes:</h2>
                <p>{selectedProducersCheckboxes.length > 0 ? selectedProducersCheckboxes.join(', ') : 'None selected'}</p>
            </div>

            <div className="anime-list">
                <div className="anime-list__filter">
                    <p>по типу</p>
                    <input
                        type="radio"
                        name="type"
                        value="tv"
                        onChange={handleTypeChange}
                    />
                    <input
                        type="radio"
                        name="type"
                        value="movie"
                        onChange={handleTypeChange}
                    />
                    <input
                        type="radio"
                        name="type"
                        value="ova"
                        onChange={handleTypeChange}
                    />

                    <input
                        type="radio"
                        name="type"
                        value="special"
                        onChange={handleTypeChange}
                    />
                    <input
                        type="radio"
                        name="type"
                        value="ona"
                        onChange={handleTypeChange}
                    />
                    <input
                        type="radio"
                        name="type"
                        value="music"
                        onChange={handleTypeChange}
                    />
                    <input
                        type="radio"
                        name="type"
                        value="cm"
                        onChange={handleTypeChange}
                    />

                    <input
                        type="radio"
                        name="type"
                        value="pv"
                        onChange={handleTypeChange}
                    />
                    <input
                        type="radio"
                        name="type"
                        value="tv_special"
                        onChange={handleTypeChange}
                    />
                </div>
                {props.animeList.map((anime) => (

                    <div key={anime.mal_id} className="anime-card">

                        <Link to={`/anime-item/${anime.mal_id}`}>
                            <img src={anime.images.webp.image_url} alt={anime.title}/>
                            <div className="anime-card__info">
                                <h4>{anime.title}</h4>
                                <p>популярность: {anime.popularity ? anime.popularity : 0}</p>
                                <p>
                                    оценка:
                                    <span
                                        className={`${anime.score < 4 ? 'red' : anime.score > 7 ? 'green' : 'yellow'}`}>
                                     {anime.score ? anime.score : 0}
                                </span>
                                </p>
                                <p>количество оценок: {anime.scored_by ? anime.scored_by : 0}</p>
                                <p>количество favorites: {anime.favorites ? anime.favorites : 0}</p>
                                <p>количество эпизодов: {anime.episodes ? anime.episodes : 0}</p>
                                <p>тип: {anime.type}</p>
                                <p>рейтинг: {anime.rating}</p>
                                <p>статус: {anime.status}</p>
                                <p>
                                    жанры: {anime.genres.map((genre, index) => (
                                    <span
                                        key={genre.mal_id}>{genre.name}{(anime.genres.length - 1) !== index ? ', ' : ''}</span>
                                ))}
                                </p>
                                <p>
                                    исключенные жанры: {anime.explicit_genres.map((genre, index) => (
                                    <span
                                        key={genre.mal_id}>{genre.name}{(anime.genres.length - 1) !== index ? ', ' : ''}</span>
                                ))}
                                </p>
                                <p>
                                    продюсеры: {anime.producers.map((producer, index) => (
                                    <span
                                        key={producer.mal_id}>{producer.name}{(anime.producers.length - 1) !== index ? ', ' : ''}</span>
                                ))}
                                </p>

                                {/*<p>исключенные жанры: {anime.genres_exclude}</p>*/}
                                {/*<p>продюсеры: {anime.producers}</p>*/}
                            </div>
                        </Link>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default AnimeList;
