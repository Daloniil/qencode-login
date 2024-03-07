import { FC, PropsWithChildren } from 'react';
import classes from '../../styles/widgets/Title.module.scss';

export const Title: FC<PropsWithChildren> = ({ children }) => {
	return <h1 className={classes['title']}>{children}</h1>;
};

