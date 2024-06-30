
import http from 'node:http';
import { handler } from './request-handler.js';



const server = http.createServer(handler);

const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

