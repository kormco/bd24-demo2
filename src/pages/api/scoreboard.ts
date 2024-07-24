import { NextApiRequest, NextApiResponse } from 'next';
import { getSFDCConnection } from './util/session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const conn = await getSFDCConnection(req, res);
    if (!conn) return;
    if (req.headers.accept && req.headers.accept === 'text/event-stream') {
        res.writeHead(200, {
            Connection: 'keep-alive',
            'Content-Encoding': 'none',
            'Cache-Control': 'no-cache',
            'Content-Type': 'text/event-stream',
          });

        const HEARTBEAT_INTERVAL = 5000; // 5 seconds (adjust this as needed)
        const intervalId = setInterval(() => {
            res.write(': heartbeat\n\n');
        }, HEARTBEAT_INTERVAL);

        console.log('subscribing...');

        //@ts-ignored
        conn.streaming.topic("/event/Baseball_Play__e").subscribe((message) => {
                res.write('event: message\n');
                res.write(`data: ${JSON.stringify(message)}`);
                res.write("\n\n");
                //console.log('message rec ack_' + message.event.replayId);
          });

        req.socket.on('close', () => {
            // Clean up resources and stop sending updates when the client disconnects
            clearInterval(intervalId);
            res.end(); 
        });

    } else {
        // Return a 404 response for non-SSE requests
        res.status(404).end();
    }
}