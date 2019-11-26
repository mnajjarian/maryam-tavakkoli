import React from 'react';

interface ButtonProps {
    text: string;
    handleClick?: () => void;
}
const Button = (props: ButtonProps) => {
    const { text, handleClick } = props;
    
    return(
        <button type="submit" className="button" onClick={handleClick} >{text}</button>
    );
};

export default Button;