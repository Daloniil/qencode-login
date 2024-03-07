import { FC } from 'react';

import classes from '../../styles/widgets/IconButton.module.scss';
import {Button} from "../Button";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	icon: string;
	text: string;
};

export const IconButton: FC<IconButtonProps> = ({ icon, text, ...props }) => {
	return (
		<Button className={classes['icon-button']} {...props}>
			<img src={icon} alt='Icon' />
			{text}
		</Button>
	);
};

