import { Scenario } from '../data/common';
import MorningIcon from '../lib/icons/Morning';
import AfternoonIcon from '../lib/icons/Afternoon';
import NightIcon from '../lib/icons/Night';
import MorningImg from '../lib/backgrounds/Morning.json';
import AfternoonImg from '../lib/backgrounds/Afternoon.json';
import NightImg from '../lib/backgrounds/Night.json';

export interface ScenarioOptions {
	bgImage: string;
}

interface getScenarioOptionsProps {
	s: Scenario | undefined;
}

export type PlantMetric = 'Water' | 'Sunlight' | 'Temperature' | 'Humidity';
export const plantMetrics: PlantMetric[] = [
	'Water',
	'Sunlight',
	'Temperature',
	'Humidity',
];

export const getButtonIcon = (s: Scenario, active: boolean) => {
	switch (s) {
		case 'Morning':
			return <MorningIcon fill={active ? '#AD7B1B' : 'black'} />;
		case 'Afternoon':
			return <AfternoonIcon fill={active ? '#2FB002' : 'black'} />;
		case 'Night':
			return <NightIcon fill={active ? '#0500FF' : 'black'} />;
	}
};

export function getScenarioOptions({
	s,
}: getScenarioOptionsProps): ScenarioOptions {
	switch (s) {
		case 'Morning':
			return {
				bgImage: MorningImg.uri,
			};
		case 'Afternoon':
			return {
				bgImage: AfternoonImg.uri,
			};
		case 'Night':
			return {
				bgImage: NightImg.uri,
			};
		default:
			return {
				bgImage: 'white',
			};
	}
}
