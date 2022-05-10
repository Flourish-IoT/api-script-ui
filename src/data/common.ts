import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { getScenarioUploadData } from '../lib/util/helper';

export const scenarios = ['Morning', 'Afternoon', 'Night'] as const;
export type Scenario = typeof scenarios[number];

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

export type DataMode = 'Instant' | 'Duration';

export interface DurationScenarioParams {
	scenario: Scenario;
	sensorId: number;
	delay: number;
}

export const useDurationScenario = () => {
	return useMutation(async (params: DurationScenarioParams) => {
		return (await ServerAxiosInstance.post<string>(`/run`, params)).data;
	});
};

export interface User {
	userId: number;
	email: string;
	username: string;
}

export const useUser = (userId: number) => {
	return useQuery(['users', userId], async () => {
		const query = `/users/${userId}`;
		const res = await ApiAxiosInstance.get<User>(query);
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

export interface Plant {
	id: number;
	name: string;
	image: string | null;
	deviceId: number;
	plantType: {
		id: number;
		scientificName: string;
	};
	gaugeRatings: {
		light: number;
		temperature: number;
		humidity: number;
		soilMoisture: number;
	};
	sensorData: ScenarioData;
}

export interface ScenarioData {
	timestamp: Date;
	temperature: number;
	humidity: number;
	soilMoisture: number;
	light: number;
	additional: {};
}

export const usePlants = (userId: number) => {
	return useQuery(['users', userId, 'plants'], async () => {
		const query = `/users/${userId}/plants`;
		return (await ApiAxiosInstance.get<Plant[]>(query)).data;
	});
};

interface PushScenarioParams {
	userId: number;
	plantIds: number[];
	scenario: Scenario;
}

export const useInstantScenario = () => {
	const query = (id: number) => `/devices/${id}/data`;

	return useMutation(async ({ plantIds, scenario }: PushScenarioParams) => {
		return await Promise.all(
			plantIds.map(
				async (id) =>
					(
						await ApiAxiosInstance.post<string>(
							query(id),
							getScenarioUploadData(scenario)
						)
					).data
			)
		);
	});
};
