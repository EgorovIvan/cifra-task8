import * as React from 'react';
import AnimeList from "./pages/AnimeList.tsx";
import AnimeItem from "./pages/AnimeItem.tsx";
import {Route, Routes} from "react-router-dom";
import ViewLater from "./pages/ViewLater.tsx";
import Header from "./components/Header.tsx";

const App: React.FC = () => {
    return (
        <div className="app">
            <div className="container">

                <Header/>

                <Routes>
                    <Route path="/" element={<AnimeList />} />
                    <Route path="/anime-item/:id" element={<AnimeItem />} />
                    <Route path="/view-later" element={<ViewLater />} />
                </Routes>
            </div>

        </div>
    );
};

export default App;
