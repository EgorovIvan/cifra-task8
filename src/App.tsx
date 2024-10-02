import * as React from 'react';
import AnimeList from "./components/AnimeList.tsx";
import AnimeItem from "./pages/AnimeItem.tsx";
import {Route, Routes} from "react-router-dom";

const App: React.FC = () => {
    return (
        <div className="app">
            <div className="container">
                <Routes>
                    <Route path="/" element={<AnimeList />} />
                    <Route path="/anime-item/:id" element={<AnimeItem />} />
                </Routes>
            </div>

        </div>
    );
};

export default App;
