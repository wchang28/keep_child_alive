const { spawn } = require('child_process');

let shell_cmd = process.argv[2] || process.env.SHELL_CMD || 'sleep 10';

console.log(`[${new Date().toISOString()}]: starting the child process. shell_cmd=${shell_cmd}`);

let child = null;

function spawnChild() {
	child = spawn(shell_cmd, {stdio: 'inherit', stderr: 'inherit', shell: true, windowsHide: true});
	child
	.on("error", (err) => {
		console.error(`[${new Date().toISOString()}]: error spawning child process. err=${JSON.stringify(err)}`);
		process.exit(1);
	}).on("exit", (code, signal) => {
		console.log(`[${new Date().toISOString()}]: child process exits with code=${code}`);
		console.log(`[${new Date().toISOString()}]: re-launching child process. shell_cmd=${shell_cmd}`);
		spawnChild();
	});
}

spawnChild();