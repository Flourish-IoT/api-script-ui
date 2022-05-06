import { Scenario } from '../data/common';
import MorningIcon from '../lib/icons/Morning';
import AfternoonIcon from '../lib/icons/Afternoon';
import NightIcon from '../lib/icons/Night';
import Humidity from '../lib/icons/Humidity';
import Sunlight from '../lib/icons/Sunlight';
import Temperature from '../lib/icons/Temperature';
import MorningImg from '../lib/backgrounds/Morning.json';
import AfternoonImg from '../lib/backgrounds/Afternoon.json';
import NightImg from '../lib/backgrounds/Night.json';
import SoilMoisture from '../lib/icons/SoilMoisture';

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

export const getMetricIcon = (s: PlantMetric) => {
	switch (s) {
		case 'Water':
			return <SoilMoisture />;
		case 'Sunlight':
			return <Sunlight />;
		case 'Temperature':
			return <Temperature />;
		case 'Humidity':
			return <Humidity />;
	}
};

export const getMetricTitle = (s: PlantMetric) => {
	switch (s) {
		case 'Water':
			return '% Soil Moisture';
		case 'Humidity':
			return '% Air Humidity';
		case 'Sunlight':
			return 'k Lux';
		case 'Temperature':
			return `° Farenheit`;
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
