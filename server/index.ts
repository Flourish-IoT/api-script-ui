// Packages
import express from 'express';
import * as cp from 'child_process';
import cors from 'cors';

const app = express();
const env = process.env;
const serverPort = env.PORT ?? 5001;
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

const scenarios = ['Morning', 'Afternoon', 'Night'] as const;
type Scenario = typeof scenarios[number];

interface RunScriptParams {
	plantId: number;
	delay?: number;
	scenario: Scenario;
}

const activateVenvCmd = 'source <venv>/bin/activate';
const scriptFileDir =
	'./modules/flourish-api/scripts/simulation/simulate_sensor.py';
const dataFolderDir = './server/data/';

app.post('/run', async (req, res) => {
	let { plantId, scenario, delay = 0 } = req.body as RunScriptParams;

	if (delay < 1) delay = 1;

	cp.exec(
		`${activateVenvCmd} && python3 ${scriptFileDir} -i ${plantId} -f ${dataFolderDir}${scenario}.csv -u "${apiUrl}" -d ${delay}`,
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
