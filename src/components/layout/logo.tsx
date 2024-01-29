import React from "react";

export const Logo = (props: {className: string}) => {
    return (
        <img className={props.className}
            src="../icons/filtered_icon.png" alt="logo" />
    );
}