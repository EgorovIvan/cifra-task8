import * as React from 'react';

interface Props {
    placeholder: string;
    value: string;
    onChange: () => void;
    onClick: () => void;
}

const SearchInput: React.FC<Props> = ({placeholder, value, onChange, onClick}: Props) => {

    return (
        <div className="search-input">
            <input
                className=""
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}>
            </input>
            <button type="button" onClick={onClick}></button>
        </div>
    )
}

export default SearchInput;
