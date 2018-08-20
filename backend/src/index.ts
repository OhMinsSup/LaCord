import Server from './server';
import { disconnect } from './database/db';
import { PORT } from './config/config';

Server.listen(PORT, () => {
    console.log(`LaCord HTTP Server running on port ${PORT} ✅`);
}).on("error", (e) => {
    disconnect();
    console.error(e);
});