import { SVGProps } from 'react';

export default function SoilMoisture({ ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width='24'
			height='28'
			viewBox='0 0 24 28'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M12 26C9.34784 26 6.8043 24.9886 4.92893 23.1882C3.05357 21.3879 2 18.9461 2 16.4C2 12.1976 5.3875 8.8364 8.36625 5.756L12 2L15.6337 5.756C18.6125 8.8376 22 12.1988 22 16.4C22 18.9461 20.9464 21.3879 19.0711 23.1882C17.1957 24.9886 14.6522 26 12 26Z'
				stroke='#022229'
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
