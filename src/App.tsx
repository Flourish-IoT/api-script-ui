import { IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Scenario, scenarios, useRunScript } from './data/common';
import { getScenarioOptions, transition } from './providers/Theme';

export default function App() {
	const [currentScenario, setCurrentScenario] = useState<Scenario>();
	const [sensorId, setSensorId] = useState(1);
	const runScript = useRunScript();
	const options = getScenarioOptions({ s: currentScenario });

	const handleRunScript = async (scenario: Scenario) => {
		try {
			await runScript.mutateAsync({ sensorId, scenario, delay: 0 });
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
				{runScript.isLoading
					? 'Uploading scenario...'
					: runScript.isError
					? 'Failed to upload scenario.'
					: !!currentScenario
					? `The scenario is ${currentScenario.toLowerCase()}.`
					: 'Select a scenario to start.'}
			</Typography>
			<TextField
				label='Sensor ID'
				inputProps={{
					inputMode: 'numeric',
					pattern: '[0-9]*',
					minLength: 0,
					maxLength: 1,
					style: {
						color: options.uiColor,
						transition,
					},
				}}
				value={sensorId}
				onChange={(e) => setSensorId(Number(e.target.value))}
				disabled={runScript.isLoading}
				sx={{
					'& label': {
						color: options.uiColor,
						transition,
					},
					'& .MuiOutlinedInput-root': {
						'& fieldset, &:hover fieldset': {
							borderColor: options.uiColor,
							transition,
						},
					},
				}}
			/>
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
						disabled={runScript.isLoading}
						sx={{ mx: i === 1 ? 5 : 0, transition }}
					>
						{getScenarioOptions({ s }).icon}
					</IconButton>
				))}
			</div>
		</main>
	);
}
