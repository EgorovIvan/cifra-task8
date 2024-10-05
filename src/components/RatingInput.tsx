import * as React from 'react';
import {useVideoStore} from "../store/useVideoStore.ts";

interface Props {
    onChange: () => void;
}

const RatingInput: React.FC<Props> = ({onChange}: Props) => {

    const {videoItem} = useVideoStore();

    return (
        <div className="Rating">
            <span className="Rating_label">Rating</span>
            <div className="Rating_input">
                <input id="Rating15" name="rating2" type="radio" value="10" onChange={onChange}/>
                <label htmlFor="Rating15"><div></div></label>
                <input id="Rating14" name="rating2" type="radio" value="9" onChange={onChange}/>
                <label htmlFor="Rating14"><div></div></label>
                <input id="Rating13" name="rating2" type="radio" value="8" onChange={onChange}/>
                <label htmlFor="Rating13"><div></div></label>
                <input id="Rating12" name="rating2" type="radio" value="7" onChange={onChange}/>
                <label htmlFor="Rating12"><div></div></label>
                <input id="Rating11" name="rating2" type="radio" value="6" onChange={onChange}/>
                <label htmlFor="Rating11"><div></div></label>
                <input id="Rating10" name="rating2" type="radio" value="5" onChange={onChange}/>
                <label htmlFor="Rating10"><div></div></label>
                <input id="Rating9" name="rating2" type="radio" value="4" onChange={onChange}/>
                <label htmlFor="Rating9"><div></div></label>
                <input id="Rating8" name="rating2" type="radio" value="3" onChange={onChange}/>
                <label htmlFor="Rating8"><div></div></label>
                <input id="Rating7" name="rating2" type="radio" value="2" onChange={onChange}/>
                <label htmlFor="Rating7"><div></div></label>
                <input id="Rating6" name="rating2" type="radio" value="1" onChange={onChange} checked={videoItem.rating === 1}/>
                <label htmlFor="Rating6"><div></div></label>
            </div>
        </div>
    )
}

export default RatingInput;
