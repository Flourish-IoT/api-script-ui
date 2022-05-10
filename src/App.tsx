import { useEffect, useState } from 'react';
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
import ScenarioControls from './lib/components/ScenarioControls';
import CurrentPlants from './lib/components/CurrentPlants';
import CredentialFilters from './lib/components/CredentialFilters';

export default function App() {
	const [currentScenario, setCurrentScenario] = useState<Scenario>();
	const [userId, setUserId] = useState(3);
	const [sensorId, setSensorId] = useState<number | undefined>();
	const [dataMode] = useState<DataMode>('Instant');
	const instantScenario = useInstantScenario();
	const durationScenario = useDurationScenario();
	const { data: userData, isLoading: userDataIsLoading } = useUser(userId);
	const { data: sensors, isLoading: sensorsIsLoading } = useSensors(userId);
	const { data: plants, isLoading: plantsIsLoading } = usePlants(userId);

	useEffect(() => {
		if (!sensors) return;
		setSensorId(sensors[0]?.id ?? undefined);
	}, [sensors]);

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
	const plantsToShow = dataMode === 'Instant' ? plants : plantsInSensor;

	const handleChangeScenario = async (scenario: Scenario) => {
		try {
			if (dataMode === 'Instant') {
				// await instantScenario.mutateAsync({
				// 	userId,
				// 	plantIds: plantsToShow.map((p) => p.id),
				// 	scenario,
				// });
			} else {
				if (!sensorId) return;
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
					: dataMode === 'Duration' && !sensorId
					? 'No sensors on this user'
					: !!currentScenario
					? `The scenario is ${currentScenario}`
					: 'Select a scenario to start'}
			</Typography>

			<ScenarioControls
				currentScenario={currentScenario}
				disabled={instantScenario.isLoading}
				onClick={handleChangeScenario}
			/>

			<CredentialFilters
				userId={userId}
				onUserIdChange={(newValue) => setUserId(newValue)}
				dataMode={dataMode}
				sensorId={sensorId}
				onSensorIdChange={(newValue) => setSensorId(newValue)}
			/>

			<CurrentPlants plantsToShow={plantsToShow} />
		</Box>
	);
}
