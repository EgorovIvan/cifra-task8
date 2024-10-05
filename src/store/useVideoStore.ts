import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import axios from "axios";

interface Video {
    id: string;
    video_id: string | undefined;
    title: string;
    url: string | undefined;
    rating: number;
    date: Date;
}

interface VideoState {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
    videoItem: Video;
    videoList: Video[];
    setRatingVideo: (rating: number) => void;
    clearVideoItem: () => void;
    addToVideoList: () => void;
    removeFromVideoList: (id: string) => void;
    fetchVideoItem: (id: string, title: string) => Promise<void>;
    sortByRating: () => void;
    sortByDate: () => void;
}

export const useVideoStore = create<VideoState>(
    persist(
        (set) => ({
            videoItem: '',
            videoList: [],

            currentPage: 1,
            totalPages: 1,

            // Установить текущую страницу
            setCurrentPage: (page: number) => set({currentPage: page}),

            // API запрос на видео
            fetchVideoItem: async (id: string, title: string) => {
                try {
                    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/videos`)
                    const result = response.data.data.promo[0]?.trailer

                    set({
                        result, videoItem: {
                            id: id,
                            video_id: result?.youtube_id,
                            title: title,
                            url: result?.embed_url,
                            rating: 1,
                            date: new Date()
                        }
                    })

                    // console.log(new Date())
                } catch (error) {
                    console.error('Error fetching videoList:', error)
                }
            },

            // Установить рейтинг
            setRatingVideo: (rating: number): void => {
                set((state) => ({
                    videoItem: {
                        ...state.videoItem,
                        rating: rating,
                    }
                }))
            },

            // Обнулить state VideoItem
            clearVideoItem: (): void => {
                set((state) => ({videoItem: ''}))
            },

            // Добавить видео в ПП
            addToVideoList: (): void => {
                try {
                    set((state) => ({
                        videoList: [...state.videoList, state.videoItem],
                    }));
                    set((state) => ({
                        totalPages: Math.ceil(state.videoList.length / 7)
                    }));
                } catch (error) {
                    console.error('Error add videoItem:', error)
                }
            },

            // Удалить видео из ПП
            removeFromVideoList: (video_id: string): void => {
                try {
                    set((state) => ({
                        videoList: state.videoList.filter(item => item.id !== video_id)
                    }));
                    set((state) => ({
                        totalPages: Math.ceil(state.videoList.length / 7)
                    }));
                } catch (error) {
                    console.error('Error remove videoItem:', error)
                }
            },

            // Сортировать по рейтингу
            sortByRating: (): void => {
                set((state) => ({
                    videoList: state.videoList.sort((a, b) =>
                        a.rating - b.rating
                    ),
                }));
            },

            // Сортировать по дате
            sortByDate: (): void => {
                set((state) => ({
                    videoList: state.videoList.sort((a, b) =>
                        b.date - a.date
                    ),
                }));
            },

        }),
        {
            name: 'video-storage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)
