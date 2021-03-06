// Packages
import express from 'express';
import * as cp from 'child_process';
import cors from 'cors';

// Variables

const app = express();
const serverPort = 5001;
const clientPort = 3000;
const serverUrl = `http://localhost:${serverPort}`;
const clientUrl = `http://localhost:${clientPort}`;
const apiUrl = 'http://3.83.190.154:5000';

// Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	cors({
		origin: clientUrl,
		optionsSuccessStatus: 200,
	})
);

app.listen(serverPort, () => {
	console.log(`Listening at ${serverUrl}`);
});

// Routing

const scenarios = ['Morning', 'Afternoon', 'Night'] as const;
type Scenario = typeof scenarios[number];

interface RunScriptParams {
	sensorId: number;
	delay?: number;
	scenario: Scenario;
}

const activateVenvCmd =
	'cd ./modules/flourish-api/ && source venv/bin/activate && cd ../../';
const scriptFileDir =
	'./modules/flourish-api/scripts/simulation/simulate_sensor.py';
const dataFolderDir = './server/data/';

app.post('/run', async (req, res) => {
	let { sensorId, scenario, delay = 0 } = req.body as RunScriptParams;
	const uploadDataScript = `python3 ${scriptFileDir} -i ${sensorId} -f ${dataFolderDir}${scenario}.csv -u "${apiUrl}" -d ${delay}`;

	cp.exec(
		`${activateVenvCmd} && ${uploadDataScript}`,
		(err, stdout, stderr) => {
			if (err) {
				console.error(err);
				res.status(500).send('Failed execute script');
				return;
			}

			console.log(stdout);
			res.status(200).send('OK');
		}
	);
});
