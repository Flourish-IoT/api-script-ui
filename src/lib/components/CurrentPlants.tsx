import { Box, Typography } from '@mui/material';
import { CSSProperties } from 'react';
import { Plant } from '../../data/common';
import Chlorophytum from '../icons/Chlorophytum';
import Crassula from '../icons/Crassula';
import DracaenaRegular from '../icons/DracaenaRegular';
import DracaenaTrifasciata from '../icons/DracaenaTrifasciata';
import Epipremnum from '../icons/Epipremnum';

interface CurrentPlantsProps {
	plantsToShow: Plant[];
}

const getPlantSvg = (scientificName: string, styles: CSSProperties) => {
	switch (scientificName.trim()) {
		case 'Crassula ovata':
			return <Chlorophytum style={{ ...styles, width: 200 }} />;
		case 'Chlorophytum comosum':
			return <Crassula style={{ ...styles, width: 50 }} />;
		case 'Epipremnum aureum':
			return <DracaenaRegular style={{ ...styles, width: 200 }} />;
		case 'Dracaena':
			return <DracaenaTrifasciata style={{ ...styles, width: 50 }} />;
		case 'Dracaena trifasciata':
			return <Epipremnum style={{ ...styles, width: 80 }} />;
		default:
			return undefined;
	}
};

export default function CurrentPlants({ plantsToShow }: CurrentPlantsProps) {
	const styles = {
		outerContainer: {
			width: '100%',
			px: '15%',
			display: 'flex',
			alignItems: 'flex-end',
			justifyContent: 'space-between',
		},
		plantContainer: {
			width: 100 / plantsToShow.length + '%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'flex-end',
		},
		imageAsSvgTag: {
			width: 75,
			height: 'auto',
			justifyContent: 'flex-end',
		},
		imgAsImgTag: {
			width: 150,
			height: 150,
			borderRadius: '50%',
		},
		plantName: {
			mt: 2,
		},
	};

	return (
		<Box sx={styles.outerContainer}>
			{plantsToShow.map((p) => {
				const svgPhoto = getPlantSvg(
					p.plantType.scientificName,
					styles.imageAsSvgTag
				);

				return (
					<Box key={p.id} sx={styles.plantContainer}>
						{!!svgPhoto ? (
							svgPhoto
						) : (
							<Box
								component='img'
								src={p.image ?? undefined}
								alt='Plant'
								sx={styles.imgAsImgTag}
							/>
						)}
						<Typography variant='h5' sx={styles.plantName}>
							{p.name}
						</Typography>
					</Box>
				);
			})}
		</Box>
	);
}
