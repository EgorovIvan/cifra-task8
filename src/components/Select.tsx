import * as React from 'react';
import {Sort} from "../pages/AnimeList.tsx";

interface Props {
    name: string;
    placeholder: string;
    disabled: boolean;
    values: Sort[];
    onChange: () => void;
}

const Select: React.FC<Props> = ({name, placeholder, disabled, values, onChange}: Props) => {

    return (
        <div className="select-wrapper">
            <div className="select animated zoomIn">
                <input type="radio" name={name} disabled={disabled}/>
                <i className="toggle icon icon-arrow-down"></i>
                <i className="toggle icon icon-arrow-up"></i>
                <p className="placeholder">{placeholder}</p>
                {values.map((label) => (
                    <label key={label.name} className="option">
                        <input
                            type="radio"
                            name={name}
                            value={label.name}
                            onChange={onChange}
                        />
                        <p className="title animated fadeIn">{label.text}</p>
                    </label>
                ))}
                {/*<label className="option">*/}
                {/*    <input type="radio" name="option"/>*/}
                {/*    <p className="title animated fadeIn"><i className="icon icon-fire"></i>Fire</p>*/}
                {/*</label>*/}
                {/*<label className="option">*/}
                {/*    <input type="radio" name="option"/>*/}
                {/*    <p className="title animated fadeIn"><i className="icon icon-badge"></i>Badge</p>*/}
                {/*</label>*/}
            </div>
        </div>
    )
}

export default Select;
