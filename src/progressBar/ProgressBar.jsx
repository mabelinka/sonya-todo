import React, {useEffect, useRef} from 'react';

const ProgressBar = () => {

    return (
        <div className="progressBar">
            <div className="progressBar">
                <div className="progressValue"></div>
            </div>
            <p className="progressNumber">74%</p>
        </div>
    );
};

export default ProgressBar;