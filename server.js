import Express from 'express';
import BodyParser from 'body-parser';

import Routes from './routes';

const app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));
app.use(Routes);

app.listen(3001, () => console.log('Application started on port 3001'));