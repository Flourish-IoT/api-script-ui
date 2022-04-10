import { useState } from 'react';
import { Scenario, scenarios, useRunScript } from './data/common';

export default function App() {
	const [currentScenario, setCurrentScenario] = useState<Scenario>();
	const [plantId, setSensorId] = useState(1);
	const runScript = useRunScript();

	const handleRunScript = async (scenario: Scenario) => {
		try {
			await runScript.mutateAsync({ plantId, scenario, delay: 0 });
			setCurrentScenario(scenario);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<main
			style={{
				flex: 1,
				backgroundColor: 'black',
			}}
		>
			<div className='controls'>
				<h1>
					{currentScenario
						? 'The scenario is currently: ' + currentScenario
						: 'Select a scenario to start'}
				</h1>
				<label>Plant ID:</label>
				<input
					type='number'
					maxLength={1}
					value={plantId}
					onChange={(e) => setSensorId(Number(e.target.value))}
				/>
				{scenarios.map((s) => (
					<button key={s} onClick={() => handleRunScript(s)}>
						{s}
					</button>
				))}
			</div>
		</main>
	);
}
