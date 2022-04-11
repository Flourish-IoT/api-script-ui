import { Scenario } from '../data/common';
import Brightness5TwoToneIcon from '@mui/icons-material/Brightness5TwoTone';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import ModeNightTwoToneIcon from '@mui/icons-material/ModeNightTwoTone';
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';

interface ScenarioOptions {
	bgColor: string;
	textColor: string;
	icon: JSX.Element;
	uiColor: string;
	btnBgColor: string;
}

interface getScenarioOptionsProps {
	s: Scenario | undefined;
	isSelected?: boolean;
}

export const transition =
	'color, background-color, border-color 1s ease-out, background-color 1s ease-out';

export function getScenarioOptions({
	s,
}: getScenarioOptionsProps): ScenarioOptions {
	const fontSize = 'large';

	let iconColor = 'black';
	let btnBgColor = 'white';

	switch (s) {
		case 'Morning':
			return {
				bgColor: '#99D5FF',
				textColor: 'black',
				uiColor: 'black',
				btnBgColor: btnBgColor,
				icon: (
					<Brightness5TwoToneIcon
						fontSize={fontSize}
						sx={{ color: iconColor }}
					/>
				),
			};
		case 'Afternoon':
			return {
				bgColor: '#FFFF8C',
				textColor: 'black',
				uiColor: 'black',
				btnBgColor: btnBgColor,
				icon: (
					<LightModeTwoToneIcon
						fontSize={fontSize}
						sx={{ color: iconColor }}
					/>
				),
			};
		case 'Night':
			return {
				bgColor: '#0400C7',
				textColor: 'white',
				uiColor: 'white',
				btnBgColor: btnBgColor,
				icon: (
					<ModeNightTwoToneIcon
						fontSize={fontSize}
						sx={{ color: iconColor }}
					/>
				),
			};
		default:
			return {
				bgColor: 'white',
				textColor: 'black',
				uiColor: 'black',
				btnBgColor: btnBgColor,
				icon: (
					<CircleTwoToneIcon
						fontSize={fontSize}
						sx={{ color: iconColor }}
					/>
				),
			};
	}
}
