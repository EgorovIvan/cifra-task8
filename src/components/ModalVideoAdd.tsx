import * as React from "react";
import {useVideoStore} from "../store/useVideoStore.ts";
import Iframe from "react-iframe";
import YouTube from "react-youtube";
import {Sort} from "../pages/AnimeList.tsx";
import RatingInput from "./RatingInput.tsx";

interface Props {
    close: () => void;
}

const ModalVideoAdd: React.FC<Props> = ({close}) => {

    const {videoItem, addToVideoList, setRatingVideo} = useVideoStore();

    // Изменить значение рейтинга
    const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setRatingVideo(Number(e.target.value))
    }

    const handleAdd = () => {
        addToVideoList()
        close()
    }
    return (
        <div className={'modal-video'}>
            <div className="modal-video__form">
                <div
                    className="modal-video__form-close"
                    onClick={close}
                ></div>
                <h4>{videoItem.title}</h4>
                <YouTube
                    videoId={videoItem.video_id}
                    className={'anime-item__main-wrapper'}
                    iframeClassName={'anime-item__main-iframe'}
                    title={videoItem.url}
                />

                <RatingInput onChange={handleRatingChange} />

                <button className="anime-item__main-btn" onClick={handleAdd}>
                    Добавить
                </button>
            </div>
        </div>
    )
}

export default ModalVideoAdd;
