import * as React from 'react';
import {Sort} from "../pages/AnimeList.tsx";
import Select from "./Select.tsx";

interface Props {
    name: string;
    placeholder: string;
    values: Sort[];
    onChange: () => void;
}

const RadioButtonGroup: React.FC<Props> = ({name, placeholder, values, onChange}: Props) => {

    return (
        <div className='radio-wrapper'>
            <h4 className='radio-title'>{placeholder}</h4>
            <div className='radio-inner'>
                {values.map((label) => (
                <div key={label.name}  className="radio">
                    <input
                        id={label.name}
                        name={name}
                        type="radio"
                        value={label.name}
                        onChange={onChange}
                    />
                    <label htmlFor={label.name}>{label.text}</label>
                </div>
                ))}
                {/*<div className="radio">*/}
                {/*    <input id="Radio2" name="radio" type="radio" value="radio2" />*/}
                {/*    <label htmlFor="Radio2">Bubble 2</label>*/}
                {/*</div>*/}
                {/*<div className="radio">*/}
                {/*    <input id="Radio3" name="radio" type="radio" value="radio3" />*/}
                {/*    <label htmlFor="Radio3">Bubble 2</label>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default RadioButtonGroup;
