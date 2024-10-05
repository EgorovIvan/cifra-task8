import * as React from 'react';
import {Checkbox} from "../pages/AnimeList.tsx";

interface Props {
    placeholder: string;
    values: Checkbox[];
    checked: string[];
    onChange: (id: number) => void;
}

const ToggleSwitches: React.FC<Props> = ({placeholder, values, checked, onChange}: Props) => {

    return (
        <div className='toggle-wrapper'>
            <h4 className='toggle-title'>{placeholder}</h4>
            <div className='toggle-inner'>
                {values.map((label) => (
                    <div key={label.id} className="toggle">
                        <input
                            id={label.name}
                            name={label.name}
                            type="checkbox"
                            checked={checked.includes(String(label.id))}
                            value={label.name}
                            onChange={() => onChange(label.id)}
                        />
                        <label htmlFor={label.name}>{label.name}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ToggleSwitches;
