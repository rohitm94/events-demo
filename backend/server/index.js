import express from 'express';
import dbConfig from './config/db';
const ngrok = require('ngrok');
import middlewareCon from './config/middleware';
import { EventRoutes, UserRoutes } from './modules';

const cors = require('cors');
const app = express();
dbConfig();

middlewareCon(app);

app.use(cors());
app.use('/api', [EventRoutes]);
app.use('/auth', [UserRoutes]);

const PORT = process.env.PORT || 3000 ;

app.listen(PORT, err => {
    if (err) {
        console.error(err);
    } {
        console.log(`App listen to port: ${PORT}`);
        (async function(){
            const endpoint = await ngrok.connect(PORT);
            console.log(`Tunneling of localhost:${PORT} is done on ${endpoint}`);
            
        })()
    }
});