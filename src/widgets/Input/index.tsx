import React, {FC, useState} from 'react';
import cls from 'classnames';

import classes from '../../styles/widgets/Input.module.scss';

import eyeOpenIcon from '../../assets/eye-open.svg';
import eyeCloceIcon from '../../assets/eye-close.svg';


type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    label?: string;
};

export const Input: FC<InputProps> = ({value, type, onChange, label, ...props}) => {
    const [inputType, setInputType] = useState(type);
    const [eyeStatus, setEyeStatus] = useState(false);


    const togglePassword = () => {
        setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
        setEyeStatus(!eyeStatus)
    };

    return (
        <div className={classes['container']}>
            {label && (
                <label
                    htmlFor={props.id || props.name}
                    className={classes['input__label']}
                >
                    {label}
                </label>
            )}
            <input
                className={cls(classes['input'], {
                    [classes['input--error']]: props.error,
                })}
                id={props.id || props.name}
                value={value}
                onChange={onChange}
                type={inputType}
                {...props}
            />
            {type === 'password' && (
                <img
                    src={eyeStatus ? eyeOpenIcon : eyeCloceIcon}
                    className={cls(classes['input__password-icon'], {
                        [classes['input__password-icon-with-label']]: label,
                    })}
                    onClick={togglePassword}
                />
            )}
            {props.error && (
                <p className={classes['input__error-label']}>{props.error}</p>
            )}
        </div>
    );
};

