import React from "react"
import './Button.css'
import {Link} from 'react-router-dom'

const STYLEs = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];


export const Button = ({children, type, onClick, buttonStyle, buttonSize})=>{
    const checkButtonStyle = STYLEs.includes(buttonStyle) ? buttonStyle : STYLEs[0]

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return (
        <Link to='sign-in' className='btn-mobile'>
            <button
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        </Link>
    )

}