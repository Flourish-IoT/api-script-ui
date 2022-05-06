import { Box, IconButton } from '@mui/material';
import { Scenario, scenarios } from '../../data/common';
import { getButtonIcon } from '../../theme/Theme';

interface ScenarioControlsProps {
	currentScenario: Scenario | undefined;
	disabled: boolean;
	onClick: (s: Scenario) => void;
}

export default function ScenarioControls({
	currentScenario,
	disabled,
	onClick,
}: ScenarioControlsProps) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				my: 3,
			}}
		>
			{scenarios.map((s, i) => (
				<IconButton
					key={s}
					onClick={() => onClick(s)}
					disabled={disabled}
					sx={{ mx: i === 1 ? 5 : 0 }}
				>
					{getButtonIcon(s, currentScenario === s)}
				</IconButton>
			))}
		</Box>
	);
}
