import { useState } from 'react';
import {
	Scenario,
	DataMode,
	scenarios,
	usePlants,
	useDurationScenario,
	useInstantScenario,
	useSensors,
	useUser,
} from './data/common';
import { getScenarioOptions, transition } from './providers/Theme';
import {
	IconButton,
	Typography,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from '@mui/material';

export default function App() {
	const [currentScenario, setCurrentScenario] = useState<Scenario>();
	const [userId, setUserId] = useState(3);
	const [sensorId, setSensorId] = useState(3);
	const [dataMode, setDataMode] = useState<DataMode>('Instant');
	const instantScenario = useInstantScenario();
	const durationScenario = useDurationScenario();
	const { data: userData, isLoading: userDataIsLoading } = useUser(userId);
	const { data: sensors, isLoading: sensorsIsLoading } = useSensors(userId);
	const { data: plants, isLoading: plantsIsLoading } = usePlants(userId);

	if (
		userDataIsLoading ||
		sensorsIsLoading ||
		plantsIsLoading ||
		!userData ||
		!sensors ||
		!plants
	)
		return null;

	const options = getScenarioOptions({ s: currentScenario });
	const plantsInSensor = plants.filter((p) => p.deviceId === sensorId);

	const handleRunScript = async (scenario: Scenario) => {
		try {
			if (dataMode === 'Instant') {
				await instantScenario.mutateAsync({ sensorId, scenario });
			} else {
				await durationScenario.mutateAsync({
					sensorId,
					scenario,
					delay: 0,
				});
			}
			setCurrentScenario(scenario);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<main
			style={{
				flex: 1,
				backgroundColor: options.bgColor,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				transition,
			}}
		>
			<Typography
				variant='h3'
				color={options.textColor}
				sx={{ paddingTop: 10, paddingBottom: 10 }}
			>
				{instantScenario.isLoading
					? 'Uploading scenario...'
					: instantScenario.isError
					? 'Failed to upload scenario.'
					: !!currentScenario
					? `The scenario is ${currentScenario.toLowerCase()}.`
					: 'Select a scenario to start.'}
			</Typography>
			<div>
				<FormControl>
					<InputLabel id='demo-simple-select-label'>User</InputLabel>
					<Select
						label='User'
						value={userId}
						sx={{ width: 200, mr: 1 }}
						onChange={({ target }) =>
							setUserId(Number(target.value))
						}
					>
						<MenuItem value={userData.userId}>
							{userData.username}
						</MenuItem>
					</Select>
				</FormControl>
				<FormControl>
					<InputLabel id='demo-simple-select-label'>
						Sensor
					</InputLabel>
					<Select
						label='Sensor'
						value={sensorId}
						sx={{ width: 200 }}
						onChange={({ target }) =>
							setSensorId(Number(target.value))
						}
					>
						{sensors.map((s, i, a) => {
							const plantNames = plants
								.filter((p) => p.deviceId === s.id)
								.map((p) => p.name)
								.join(', ');
							return (
								<MenuItem key={s.id} value={s.id}>
									{s.name} ({plantNames})
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			</div>
			<div>
				<Typography
					variant='h3'
					color={options.textColor}
					sx={{ paddingTop: 10, paddingBottom: 10 }}
				>
					{plantsInSensor.map((p) => p.name).join(', ')}
				</Typography>
			</div>
			<div
				className='controls'
				style={{
					height: '100%',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{scenarios.map((s, i) => (
					<IconButton
						key={s}
						onClick={() => handleRunScript(s)}
						disabled={instantScenario.isLoading}
						sx={{ mx: i === 1 ? 5 : 0, transition }}
					>
						{getScenarioOptions({ s }).icon}
					</IconButton>
				))}
			</div>
		</main>
	);
}
