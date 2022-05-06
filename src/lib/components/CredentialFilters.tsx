import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useUser, useSensors, usePlants } from '../../data/common';

interface CredentialFiltersProps {
	userId: number;
	sensorId: number;
	onUserIdChange: (userId: number) => void;
	onSensorIdChange: (userId: number) => void;
}

export default function CredentialFilters({
	userId,
	sensorId,
	onUserIdChange,
	onSensorIdChange,
}: CredentialFiltersProps) {
	const { data: userData } = useUser(userId);
	const { data: sensors } = useSensors(userId);
	const { data: plants } = usePlants(userId);

	if (!userData || !sensors || !plants) return null;

	return (
		<Box sx={{ flexGrow: 1 }}>
			<FormControl>
				<InputLabel id='user-select'>User</InputLabel>
				<Select
					label='User'
					value={userId}
					sx={{ width: 200, mr: 1 }}
					onChange={({ target }) =>
						onUserIdChange(Number(target.value))
					}
				>
					<MenuItem value={userData.userId}>
						{userData.username}
					</MenuItem>
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel id='sensor-select'>Sensor</InputLabel>
				<Select
					label='Sensor'
					value={sensorId}
					sx={{ width: 200 }}
					onChange={({ target }) =>
						onSensorIdChange(Number(target.value))
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
		</Box>
	);
}
