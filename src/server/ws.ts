import { Server, ServerOptions } from 'ws';

export const create = (options: ServerOptions) => {
    const wss = new Server(options);

    wss.on('connection', ws => {
        console.log('New connection');
        // ws.send('[]');

        ws.on('message', data => {
            const action = JSON.stringify(data);
            switch (action) {
                default:
                break;
            }
        });

        ws.on('close', () => {
            console.log('Close');
        });
    });
};