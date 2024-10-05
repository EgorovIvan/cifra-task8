import * as React from "react";
import {useParams} from "react-router-dom";
import {AnimeState, useAnimeStore} from "../store/useAnimeStore.ts";
import {useEffect} from "react";
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import ReactLoading from 'react-loading';
import YouTube from "react-youtube";

const AnimeItem: React.FC = () => {
    const {animeItem, fetchAnimeItem}: AnimeState = useAnimeStore();
    const {id} = useParams<{ id: string }>();

    useEffect((): void => {
        fetchAnimeItem(id)
    }, []);

    return (
        <div className="anime-item">

            {!animeItem ?
                <ReactLoading className={"anime-item__loader"} type={"spinningBubbles"} color={"#696969"} height={'10%'}
                              width={'10%'}/> :
                <>
                    <div className="anime-item__main">
                        <img src={animeItem.images.webp.large_image_url} alt={animeItem.title}/>

                        {
                            animeItem.trailer.youtube_id ?
                                <YouTube
                                    videoId={animeItem.trailer.youtube_id}
                                    className={'anime-item__main-wrapper'}
                                    iframeClassName={'anime-item__main-iframe'}
                                    title={animeItem.title}
                                /> : ''
                        }

                        <button className="anime-item__main-btn">
                            Добавить видео в ПП
                        </button>
                    </div>
                    <div className="anime-item__content">
                        <h2 className="anime-item__content-title">
                            {animeItem.title} ({animeItem.aired.prop.from.year})
                        </h2>
                        <p className="anime-item__content-title_english">{animeItem.title_english}</p>

                        <div className="anime-item__content-wrapper">
                            <h3 className="anime-item__content-subtitle">Об аниме</h3>
                            <div className="anime-item__content-item">
                                <p className="content-item__title">Рейтинг:</p>
                                <p className="content-item__text">{animeItem.rating}</p>
                            </div>
                            <div className="anime-item__content-item">
                                <p className="content-item__title">Оценка:</p>
                                <p
                                    className={"content-item__text " + `${animeItem.score < 4 ? 'red' : animeItem.score > 7 ? 'green' : 'yellow'}`}
                                >{animeItem.score ? animeItem.score : 0}</p>
                            </div>
                            <div className="anime-item__content-item">
                                <p className="content-item__title">Количество оценок:</p>
                                <p className="content-item__text">{animeItem.scored_by ? animeItem.scored_by : 0}</p>
                            </div>
                            <div className="anime-item__content-item">
                                <p className="content-item__title">Количество favorites:</p>
                                <p className="content-item__text">{animeItem.favorites ? animeItem.favorites : 0}</p>
                            </div>
                            <div className="anime-item__content-item">
                                <p className="content-item__title">Продюсеры:</p>
                                <p className="content-item__text">{animeItem.producers.map((producer, index) => (
                                    <span
                                        key={producer.mal_id}>{producer.name}{(animeItem.producers.length - 1) !== index ? ', ' : ''}</span>
                                ))}</p>
                            </div>
                            <div className="anime-item__content-item">
                                <p className="content-item__title">Жанры:</p>
                                <p className="content-item__text">{animeItem.genres.map((genre, index) => (
                                    <span
                                        key={genre.mal_id}>{genre.name}{(animeItem.genres.length - 1) !== index ? ', ' : ''}</span>
                                ))}</p>
                            </div>
                            <div className="anime-item__content-item">
                                <p className="content-item__title">Темы:</p>
                                <p className="content-item__text">{animeItem.themes.map((theme, index) => (
                                    <span
                                        key={theme.mal_id}>{theme.name}{(animeItem.themes.length - 1) !== index ? ', ' : ''}</span>
                                ))}</p>
                            </div>
                            <div className="anime-item__content-item">
                                <p className="content-item__title">Краткий обзор:</p>
                                <p className="content-item__text">{animeItem.synopsis}</p>
                            </div>
                        </div>

                    </div>
                </>
            }
        </div>
    )
}

export default AnimeItem
