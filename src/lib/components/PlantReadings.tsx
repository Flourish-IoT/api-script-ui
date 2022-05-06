import { Box, Typography } from '@mui/material';
import { Scenario } from '../../data/common';
import { plantMetrics, getMetricIcon, getMetricTitle } from '../../theme/Theme';
import { getMetricFromScenarioData } from '../util/helper';

interface PlantReadingsProps {
	currentScenario: Scenario;
}

export default function PlantReadings({ currentScenario }: PlantReadingsProps) {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-around',
				width: '100%',
			}}
		>
			{plantMetrics.map((m) => (
				<Box key={m} sx={{ display: 'flex', alignItems: 'center' }}>
					<Box sx={{ mr: 2 }}>{getMetricIcon(m)}</Box>
					<Typography variant='body1'>
						{getMetricFromScenarioData(currentScenario, m)}
						{getMetricTitle(m)}
					</Typography>
				</Box>
			))}
		</Box>
	);
}
