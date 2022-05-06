import { useState } from 'react';
import {
	Scenario,
	DataMode,
	usePlants,
	useDurationScenario,
	useInstantScenario,
	useSensors,
	useUser,
} from './data/common';
import { getScenarioOptions } from './theme/Theme';
import { Typography, Box } from '@mui/material';
import PlantReadings from './lib/components/PlantReadings';
import ScenarioControls from './lib/components/ScenarioControls';
import CurrentPlants from './lib/components/CurrentPlants';
import CredentialFilters from './lib/components/CredentialFilters';

export default function App() {
	const [currentScenario, setCurrentScenario] = useState<Scenario>();
	const [userId, setUserId] = useState(3);
	const [sensorId, setSensorId] = useState(3);
	const [dataMode] = useState<DataMode>('Instant');
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

	const handleChangeScenario = async (scenario: Scenario) => {
		try {
			if (dataMode === 'Instant') {
				await instantScenario.mutateAsync({
					userId,
					plantIds: plantsInSensor.map((p) => p.id),
					sensorId,
					scenario,
				});
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
		<Box
			component='main'
			sx={{
				flexGrow: 1,
				backgroundImage: `url("${options.bgImage}")`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				p: 5,
			}}
		>
			<Typography variant='h3' fontWeight='bold'>
				{instantScenario.isLoading
					? 'Updating scenario...'
					: instantScenario.isError
					? 'Failed to upload scenario'
					: !!currentScenario
					? `The scenario is ${currentScenario}`
					: 'Select a scenario to start'}
			</Typography>

			{!!currentScenario && (
				<PlantReadings currentScenario={currentScenario} />
			)}

			<ScenarioControls
				currentScenario={currentScenario}
				disabled={instantScenario.isLoading}
				onClick={handleChangeScenario}
			/>

			<CredentialFilters
				userId={userId}
				sensorId={sensorId}
				onUserIdChange={(newValue) => setUserId(newValue)}
				onSensorIdChange={(newValue) => setSensorId(newValue)}
			/>

			<CurrentPlants plantsInSensor={plantsInSensor} />
		</Box>
	);
}
