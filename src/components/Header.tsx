import * as React from "react";
import {Link} from "react-router-dom";

const Header: React.FC = () => {

    return (
        <div className={'header'}>
            <h4 className="header__logo">
                <Link to={`/`}>
                    Главная
                </Link>
            </h4>

            <h4 className="header__nav">
                <Link to={`/view-later`}>
                    Сохраненные видео (ПП)
                </Link>
            </h4>
        </div>
    )
}

export default Header;
