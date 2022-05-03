import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

export const scenarios = ['Morning', 'Afternoon', 'Night'] as const;
export type Scenario = typeof scenarios[number];

export interface RunScriptParams {
	sensorId: number;
	delay?: number;
	scenario: Scenario;
}

export const NodeServerUrl = 'http://localhost:5001';
export const ApiServerUrl = 'http://3.83.190.154:5000/v1';

export const ServerAxiosInstance = axios.create({
	baseURL: NodeServerUrl,
	timeout: 1000 * 60 * 0.5, // 30s
});

export const ApiAxiosInstance = axios.create({
	baseURL: ApiServerUrl,
	timeout: 1000 * 60 * 0.5, // 30s
});

export const useRunScript = () => {
	return useMutation(async (params: RunScriptParams) => {
		return (await ServerAxiosInstance.post<string>(`/run`, params)).data;
	});
};

export interface User {
	id: number;
	name: string;
	email: string;
	username: string;
	preferences: {
		temperatureUnit: string;
		confidenceRating: any;
	};
}

export const useUser = (userId: number) => {
	return useQuery(['users', userId], async () => {
		const query = `/users/${userId}`;
		// return (await ApiAxiosInstance.get<User>(query)).data;
		// const res = await ApiAxiosInstance.get<User>(query);
		const res = await axios.get<User>(ApiServerUrl + query);
		console.log(res);
		return res.data;
	});
};

interface Sensor {
	id: number;
	deviceType: string;
	deviceState: string;
	model: string;
	name: string;
}

export const useSensors = (userId: number) => {
	return useQuery(['users', userId, 'devices'], async () => {
		const query = `/users/${userId}/devices`;
		return (await ApiAxiosInstance.get<Sensor[]>(query)).data;
	});
};

interface Plant {
	id: number;
	name: string;
	image: string | null;
	gaugeRatings: {
		light: number;
		temperature: number;
		humidity: number;
		soilMoisture: number;
	};
	sensorData: {
		timestamp: string;
		temperature: number;
		humidity: number;
		soilMoisture: number;
		light: number;
	};
}

export interface ScenarioData {
	timestamp: Date;
	temperature: number;
	humidity: number;
	soilMoisture: number;
	light: number;
	additional: {};
}

const getScenarioData = (scenario: Scenario): ScenarioData => {
	switch (scenario) {
		case 'Morning': {
			return {
				timestamp: new Date(),
				temperature: 8,
				humidity: 40,
				soilMoisture: 15,
				light: 4300,
				additional: {},
			};
		}
		case 'Afternoon': {
			return {
				timestamp: new Date(),
				temperature: 15,
				humidity: 40,
				soilMoisture: 5,
				light: 4300,
				additional: {},
			};
		}
		case 'Night': {
			return {
				timestamp: new Date(),
				temperature: 35,
				humidity: 0,
				soilMoisture: 0,
				light: 10000,
				additional: {},
			};
		}
	}
};

interface PushScenarioParams {
	sensorId: number;
	scenario: Scenario;
}

export const usePushScenario = () => {
	return useMutation(async ({ sensorId, scenario }: PushScenarioParams) => {
		const query = `/devices/${sensorId}/data`;
		return (
			await ApiAxiosInstance.post<string>(
				query,
				getScenarioData(scenario)
			)
		).data;
	});
};

export const usePlants = (userId: number) => {
	return useQuery(['users', userId, 'plants'], async () => {
		const query = `/users/${userId}/plants`;
		return (await ApiAxiosInstance.get<Plant[]>(query)).data;
	});
};
