import { useState } from 'react';
import {
	Scenario,
	scenarios,
	usePlants,
	useRunScript,
	usePushScenario,
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
	const pushScenario = usePushScenario();
	const { data: userData, isLoading: userDataIsLoading } = useUser(userId);
	const { data: sensors, isLoading: sensorsIsLoading } = useSensors(userId);
	const { data: plants, isLoading: plantsIsLoading } = usePlants(userId);

	if (userDataIsLoading || sensorsIsLoading || plantsIsLoading) return null;
	if (!userData || !sensors || !plants) return null;

	const options = getScenarioOptions({ s: currentScenario });

	const handleRunScript = async (scenario: Scenario) => {
		try {
			await pushScenario.mutateAsync({ sensorId, scenario });
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
				{pushScenario.isLoading
					? 'Uploading scenario...'
					: pushScenario.isError
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
						sx={{ width: 150, mr: 1 }}
						onChange={({ target }) =>
							setUserId(Number(target.value))
						}
					>
						<MenuItem value={userData.id}>{userData.name}</MenuItem>
					</Select>
				</FormControl>
				<FormControl>
					<InputLabel id='demo-simple-select-label'>
						Sensor
					</InputLabel>
					<Select
						label='Sensor'
						value={sensorId}
						sx={{ width: 150 }}
						onChange={({ target }) =>
							setSensorId(Number(target.value))
						}
					>
						{sensors.map((s) => (
							<MenuItem value={s.id}>{s.name} (1 plant)</MenuItem>
						))}
					</Select>
				</FormControl>
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
						disabled={pushScenario.isLoading}
						sx={{ mx: i === 1 ? 5 : 0, transition }}
					>
						{getScenarioOptions({ s }).icon}
					</IconButton>
				))}
			</div>
		</main>
	);
}
