import * as React from 'react';
import {AnimeState, useAnimeStore} from "../store/useAnimeStore.ts";
import {useEffect} from "react";

interface Props {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
    fetchDate?: () => void;
}

const Pagination: React.FC<Props> = ({currentPage, totalPages, setCurrentPage, fetchDate }) => {
    const { }: AnimeState = useAnimeStore();

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    useEffect((): void => {
        if (fetchDate) {
            fetchDate()
        }
    }, [currentPage]);

    return (
        <div className="pagination">
            <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>

            {currentPage > 3 && (
                <>
                    <button onClick={() => setCurrentPage(1)}>1</button>
                    {currentPage > 4 && <span>...</span>}
                </>
            )}

            {pages
                .filter(page => Math.abs(currentPage - page) < 3)
                .map(page => (
                    <button
                        key={page}
                        className={page === currentPage ? 'active' : ''}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                ))}

            {currentPage < totalPages - 2 && (
                <>
                    {currentPage < totalPages - 3 && <span>...</span>}
                    <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
                </>
            )}

            <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
};

export default Pagination;
