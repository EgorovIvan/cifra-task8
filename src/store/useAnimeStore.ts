import {create} from 'zustand';
import axios from "axios";

interface InternalObject {
    mal_id: number;
    name: string;
    type: string
}

interface Anime {
    mal_id: number;
    title: string;
    title_english: string;
    favorites: number;
    popularity: number;
    score: number;
    scored_by: number;
    episodes: number;
    synopsis: string;
    type: string;
    rating: string;
    status: string;
    start_date: string;
    end_date: string;
    aired: {
        prop: {
            from: {
                year: number
            }
        }
    }
    genres: InternalObject[];
    explicit_genres: InternalObject[];
    producers: InternalObject[];
    themes: InternalObject[];
    images: {
        webp: {
            image_url: string
            large_image_url: string
        }
    };

    trailer: {
        youtube_id: string | undefined
    };
}


export interface AnimeState {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;

    searchBy: string;
    orderBy: string;
    sortBy: string;

    filterByType: string;
    filterByRating: string;
    filterByStatus: string;
    filterByStartDate: string;
    filterByEndDate: string;
    filterByGenres: InternalObject[];
    filterByGenresExclude: InternalObject[];
    filterByProducers: string;

    updateSearchBy: (name: string) => void;
    updateOrderBy: (name: string) => void;
    updateSortBy: (direction: string) => void;

    updateFilterByType: (type: string) => void;
    updateFilterByRating: (rating: string) => void;
    updateFilterByStatus: (status: string) => void;
    updateFilterByStartDate: (date: string) => void;
    updateFilterByEndDate: (date: string) => void;
    updateFilterByGenres: (genres: string) => void;
    updateFilterByGenresExclude: (genres: string) => void;
    updateFilterByProducers: (producers: string) => void;

    animeItem: Anime;
    animeList: Anime[];
    fetchAnimeList: () => Promise<void>;
    fetchAnimeItem: (id: string | undefined) => Promise<void>;
}

// @ts-ignore
export const useAnimeStore = create<AnimeState>((set, get) => ({
    searchBy: '',
    orderBy: '',
    sortBy: '',

    filterByType: '',
    filterByRating: '',
    filterByStatus: '',
    filterByStartDate: '',
    filterByEndDate: '',
    filterByGenres: '',
    filterByGenresExclude: '',
    filterByProducers: '',

    animeItem: '',
    animeList: [],

    currentPage: 1,
    totalPages: 1,

    // Установить текущую страницу
    setCurrentPage: (page: number) => set({ currentPage: page }),

    // Обновить результаты поиска
    updateSearchBy: (name) => set({ searchBy: name }),

    // Обновить результаты сортировки
    updateOrderBy: (name) => set({ orderBy: name }),

    // Обновить результаты сортировки (asc, desc)
    updateSortBy: (direction) => set({ sortBy: direction }),


    updateFilterByType: (type) => set({ filterByType: type }),
    updateFilterByRating: (rating) => set({ filterByRating: rating }),
    updateFilterByStatus: (status) => set({ filterByStatus: status }),
    updateFilterByStartDate: (date) => set({ filterByStartDate: date }),
    updateFilterByEndDate: (date) => set({ filterByEndDate: date }),
    updateFilterByGenres: (genres) => set({ filterByGenres: genres }),
    updateFilterByGenresExclude: (genres) => set({ filterByGenresExclude: genres }),
    updateFilterByProducers: (producers) => set({ filterByProducers: producers }),

    // API запрос на список аниме
    fetchAnimeList: async (): Promise<void> => {

        const params = {
            page: get().currentPage,
            q: get().searchBy,
            order_by: get().orderBy,
            sort: get().sortBy,
            type: get().filterByType,
            rating: get().filterByRating,
            status: get().filterByStatus,
            start_date: get().filterByStartDate,
            end_date: get().filterByEndDate,
            genres: get().filterByGenres,
            genres_exclude: get().filterByGenresExclude,
            producers: get().filterByProducers,
        };

        try {

            const response = await axios.get('https://api.jikan.moe/v4/anime', {params})

            let result: any[] = []

            if(params.order_by === "start_date" || params.order_by === "end_date") {
                result = response.data.data.reduce( (result, letter) => {
                    return result.find(item => item.mal_id === letter.mal_id) ? result : [...result, letter]
                }, [])
            } else {
                result = response.data.data
            }

            const resultTotalPages: number = response.data.pagination.items.count

            set({result, animeList: result})
            set({resultTotalPages, totalPages: resultTotalPages})
            // console.log(result)

        } catch (error) {
            console.error('Error fetching animeList:', error)
        }
    },

    // API запрос на видео
    fetchAnimeItem: async (id: string): Promise<void>  => {
        try {
            const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`)
            const result = response.data.data
            set({result, animeItem: result})
        } catch (error) {
            console.error('Error fetching animeList:', error)
        }
    }
}));
