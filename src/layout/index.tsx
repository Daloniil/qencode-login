import React from "react";
import classes from '../styles/features/Layouts.module.scss';
import logo from "../assets/logo.svg";


export const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className={classes['layouts']}>
            <img className={classes['logo']} src={logo} alt='Logo'/>
            {children}
        </div>
    )
}