const fs = require('fs');
const express = require('express');
const ReactDOMServer = require('react-dom/server');
const App = require('./dist/index.server.bundle.js');

const PORT = 3000;

const app = express();
const template = fs.readFileSync('./index.html', 'utf8'); // stupid simple template.

const todos = [
  { id: 'ed0bcc48-bbbe-5f06-c7c9-2ccb0456ceba', title: 'I have to go to work', completed: true },
  { id: '42582304-3c6e-311e-7f88-7e3791caf88c', title: 'Get new coffee.', completed: true },
  { id: '036af7f9-1181-fb8f-258f-3f06034c020f', title: 'Find a new house.', completed: false },
  { id: '1cf63885-5f75-8deb-19dc-9b6765deae6c', title: 'Create a demo repo for POC', completed: true },
  { id: '63a871b2-0b6f-4427-9c35-304bc680a4b7', title: 'This is stupidly added', completed: true },
  { id: '63a871b2-0b6f-4422-9c35-304bc680a4b7', title: 'This too has to go away', completed: false },
];

// express.static was only working for some requests, but not others.
app.use('/dist', express.static(`${__dirname}/dist`, { maxAge: '1y' }));
app.use('/css', express.static(`${__dirname}/css`, { maxAge: '1y' }));

app.get('*', (req, res) => {
  const props = { todos };
  App.default(req.url, props).then((reactComponent) => {
    const result = ReactDOMServer.renderToString(reactComponent);
    const html = template.replace('{{thing}}', result).replace('{{props}}', JSON.stringify(props));
    res.send(html);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
