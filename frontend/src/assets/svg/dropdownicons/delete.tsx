import React from 'react';
type iconType = {
    isClicked?: boolean
}
const DeleteIcon: React.FC<iconType> = ({ isClicked }) => {
    return (
        <span style={{
            width: "19px",
            height: "19px",
            color: "var(--dark-1)",
            position: "relative",
            fill: "var(--dark-1)",
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
                    <path d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z"></path>
                 </g>

            </svg>
        </span>
    )



}



export default DeleteIcon