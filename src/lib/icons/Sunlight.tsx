import { SVGProps } from 'react';

export default function Sunlight({ ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width='27'
			height='27'
			viewBox='0 0 27 27'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M13.7499 19.4074C16.8744 19.4074 19.4073 16.8745 19.4073 13.75C19.4073 10.6255 16.8744 8.09259 13.7499 8.09259C10.6254 8.09259 8.09253 10.6255 8.09253 13.75C8.09253 16.8745 10.6254 19.4074 13.7499 19.4074Z'
				stroke='#022229'
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M13.75 2V3.74074M4.61111 22.8889L5.48148 22.0185L4.61111 22.8889ZM22.0185 22.0185L22.8889 22.8889L22.0185 22.0185ZM22.0185 5.48148L22.8889 4.61111L22.0185 5.48148ZM5.48148 5.48148L4.61111 4.61111L5.48148 5.48148ZM3.74074 13.75H2H3.74074ZM25.5 13.75H23.7593H25.5ZM13.75 23.7593V25.5V23.7593Z'
				stroke='#022229'
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
