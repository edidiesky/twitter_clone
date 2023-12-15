import React from 'react';
type iconType = {

    type?: string,
    color?: string,
}
const DownloadIcon: React.FC<iconType> = ({ type, color }) => {
    if (type === 'large') {
        return (
            <span style={{
                width: "2.2rem",
                color: color ? color : "var(--grey-3)",
                height: "2.2rem",

                position: "relative",
                fill: "currentcolor",
                display: "inline-block",
            }}>
                <svg viewBox="0 0 24 24"
                    aria-hidden="true"
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "inline-block",
                    }}>

                    <g>
                        <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0
                        
                        1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>

                    </g>

                </svg>
            </span>
        )
    }
    return (
        <span style={{
            width: "1.25em",
            color: color ? color : "var(--grey-3)",
            height: "1.25em",

            position: "relative",
            fill: "currentcolor",
            display: "inline-block",
        }}>
            <svg viewBox="0 0 24 24"
                aria-hidden="true"
                style={{
                    width: "100%",
                    height: "100%",
                    display: "inline-block",
                }}>


                <g>
                    <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0
                        
                        1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>

                </g>

            </svg>
        </span>
    )
}



export default DownloadIcon