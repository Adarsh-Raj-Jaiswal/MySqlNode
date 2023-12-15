import express from 'express';
const app = express();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke');
});

app.get('/notes', (req, res) => {
    res.send('it worked')
})

app.listen(8080, () => {
    console.log('Server is running on the port 8080');
});