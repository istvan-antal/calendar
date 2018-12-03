const app = require('express')();
import { createServer } from 'http';
import { create } from './ws';

const server = createServer(app);
create({
    server,
});

// tslint:disable-next-line:no-any variable-name
app.get('*', (_req: any, res: any, _next: any) => {
    // req.session.working = 'yes!';
    res.send(`
        <script>
            var ws = new WebSocket('ws://localhost:9000');
            ws.onopen = function() {
                console.log('open');
            };
            ws.onmessage = (m) => {
                console.log(m);
            };
            ws.onclose = function() {
                // websocket is closed.
                alert("Connection is closed...");
             };
        </script>
    `);
});

// tslint:disable-next-line:no-magic-numbers
server.listen(9000);