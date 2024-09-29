import React, { useEffect, useState } from 'react';
import { useAnimeStore } from '../store/useAnimeStore.ts';
import '../scss/anime-list.scss';

const CharacterList: React.FC = () => {
    const { filteredAnimeList, fetchAnimeList, filterAnimeList } = useAnimeStore();
    // const [visibleAnime, setVisibleAnime] = useState<number>(30);
    const [filter, setFilter] = useState<string>('');

    useEffect(() => {
        fetchAnimeList();
    }, [fetchAnimeList]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
        filterAnimeList(e.target.value);
    };

    return (
        <div className="anime-list-container">
            <input
                type="text"
                placeholder="Filter by name"
                value={filter}
                onChange={handleFilterChange}
                className="filter-input"
            />
            <div className="anime-list">
                {filteredAnimeList.map((anime) => (
                    <div key={anime.id} className="anime-card">
                        {/*<img src={anime.image} alt={anime.name} />*/}
                        {/*<p>{anime.name}</p>*/}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CharacterList;
