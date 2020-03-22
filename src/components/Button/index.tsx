import React from 'react';

interface ButtonProps {
    text: string;
    handleClick?: () => void;
}
const Button: React.FC<ButtonProps> = ({ text, handleClick }) => {    
    return(
        <button type="submit" className="button" onClick={handleClick} >{text}</button>
    );
};

export default Button;