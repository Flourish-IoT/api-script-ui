import { Box, Typography } from '@mui/material';
import { Plant } from '../../data/common';

interface CurrentPlantsProps {
	plantsToShow: Plant[];
}

export default function CurrentPlants({ plantsToShow }: CurrentPlantsProps) {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			{plantsToShow.map((p) => (
				<Box
					key={p.id}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						width: '18vw',
						mx: '1%',
					}}
				>
					<Box
						component='img'
						src={p.image ?? undefined}
						alt='Plant'
						sx={{
							width: '18vw',
							height: '18vw',
							borderRadius: '50%',
							mb: 2,
						}}
					/>
					<Typography variant='h4'>{p.name}</Typography>
				</Box>
			))}
		</Box>
	);
}
