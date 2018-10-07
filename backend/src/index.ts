import * as http from 'http';
import * as config from './config/config';
import Server from './server';

const port = normalizePort(config.PORT || 5000);
const server = http.createServer(Server.callback());
server.listen(port, () => {
    console.log(`LaCord HTTP Server running on port ${port} ✅`);
});

function normalizePort(val: number | string): number | string | boolean {
    const port: number = (typeof val === "string") ? parseInt(val, 10) : val;
    if (isNaN(port)) {
        return val;
    } else if (port >= 0) {
        return port;
    } else {
        return false;
    }
}

export default server;
