import { Plant, Scenario, ScenarioData } from '../../data/common';
import { PlantMetric } from '../../theme/Theme';

export const getData = (plant: Plant, metricType: PlantMetric) => {
	switch (metricType) {
		case 'Water':
			return {
				gaugeVal: plant?.gaugeRatings?.soilMoisture,
				sensorVal: plant?.sensorData?.soilMoisture,
			};
		case 'Sunlight':
			return {
				gaugeVal: plant?.gaugeRatings?.light,
				sensorVal: plant?.sensorData?.light,
			};
		case 'Temperature':
			return {
				gaugeVal: plant?.gaugeRatings?.temperature,
				sensorVal: plant?.sensorData?.temperature,
			};
		case 'Humidity':
			return {
				gaugeVal: plant?.gaugeRatings?.humidity,
				sensorVal: plant?.sensorData?.humidity,
			};
	}
};

export const getScenarioData = (scenario: Scenario): ScenarioData => {
	let scenarioData;

	switch (scenario) {
		case 'Morning': {
			scenarioData = {
				temperature: 8,
				humidity: 40,
				soilMoisture: 15,
				light: 4300,
			};
			break;
		}
		case 'Afternoon': {
			scenarioData = {
				temperature: 15,
				humidity: 40,
				soilMoisture: 5,
				light: 4300,
			};
			break;
		}
		case 'Night': {
			scenarioData = {
				temperature: 35,
				humidity: 0,
				soilMoisture: 0,
				light: 10000,
			};
			break;
		}
	}

	return {
		timestamp: new Date(),
		additional: {},
		...scenarioData,
	};
};

export const getMetricFromScenarioData = (
	scenario: Scenario,
	metricType: PlantMetric
) => {
	const fullData = getScenarioData(scenario);
	switch (metricType) {
		case 'Humidity':
			return fullData.humidity;
		case 'Temperature':
			return fullData.temperature;
		case 'Sunlight':
			return fullData.light;
		case 'Water':
			return fullData.soilMoisture;
	}
};
