import { create } from 'zustand';
import axios from "axios";

interface Anime {
    id: number;
    name: string;
    image: string;
}

interface AnimeState {
    animeList: Anime[];
    filteredAnimeList: Anime[];
    fetchAnimeList: () => Promise<void>;
    filterAnimeList: (name: string) => void;
}

export const useAnimeStore = create<AnimeState>((set) => ({
    animeList: [],
    filteredAnimeList: [],

    fetchAnimeList: async () => {
        const storedData = localStorage.getItem('animeList');
        if (storedData) {
            set({ animeList: JSON.parse(storedData), filteredAnimeList: JSON.parse(storedData) });
            console.log(storedData)
        } else {
            try {
                const response = await axios.get('https://api.jikan.moe/v4/anime');
                const animeList = response.data;
                localStorage.setItem('animeList', JSON.stringify(animeList));
                set({ animeList, filteredAnimeList: animeList });
                console.log(response)
            } catch (error) {
                console.error('Error fetching animeList:', error);
            }
        }
    },

    filterAnimeList: (name: string) => {
        set((state) => ({
            filteredAnimeList: state.animeList.filter((char) =>
                char.name.toLowerCase().includes(name.toLowerCase())
            ),
        }));
    },
}));