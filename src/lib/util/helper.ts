import { Scenario, ScenarioData } from '../../data/common';

export const getScenarioUploadData = (scenario: Scenario): ScenarioData => {
	let scenarioData;

	switch (scenario) {
		case 'Morning': {
			scenarioData = [
				{
					temperature: 8,
					humidity: 40,
					soilMoisture: 15,
					light: 4300,
				},
				{
					temperature: 11,
					humidity: 45,
					soilMoisture: 20,
					light: 3500,
				},
				{
					temperature: 20,
					humidity: 50,
					soilMoisture: 30,
					light: 2000,
				},
			];
			break;
		}
		case 'Afternoon': {
			scenarioData = [
				{
					temperature: 15,
					humidity: 40,
					soilMoisture: 5,
					light: 4300,
				},
				{
					temperature: 8,
					humidity: 40,
					soilMoisture: 15,
					light: 4300,
				},
				{
					temperature: 20,
					humidity: 50,
					soilMoisture: 30,
					light: 2000,
				},
			];
			break;
		}
		case 'Night': {
			scenarioData = [
				{
					temperature: 35,
					humidity: 0,
					soilMoisture: 0,
					light: 10000,
				},
				{
					temperature: 11,
					humidity: 45,
					soilMoisture: 20,
					light: 3500,
				},
				{
					temperature: 15,
					humidity: 40,
					soilMoisture: 5,
					light: 4300,
				},
			];
			break;
		}
	}

	const random = Math.floor(Math.random() * scenarioData.length);

	return {
		timestamp: new Date(),
		additional: {},
		...scenarioData[random],
	};
};
