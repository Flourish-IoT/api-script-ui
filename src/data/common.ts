import { useMutation } from 'react-query';
import axios from 'axios';

export const scenarios = ['Morning', 'Afternoon', 'Night'] as const;
export type Scenario = typeof scenarios[number];

export interface RunScriptParams {
	plantId: number;
	delay?: number;
	scenario: Scenario;
}

export const NodeServerUrl = 'http://localhost:5001';

export const AxiosInstance = axios.create({
	baseURL: NodeServerUrl,
	timeout: 1000 * 60 * 0.5, // 30s
});

export const useRunScript = () => {
	return useMutation(async (params: RunScriptParams) => {
		return (await AxiosInstance.post<string>(`/run`, params)).data;
	});
};
