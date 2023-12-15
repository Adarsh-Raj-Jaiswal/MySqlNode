import express from 'express';
const app = express();

import { getNote, getNotes, createNote } from './database.js'


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke');
});

app.use(express.json())

app.get('/notes', async (req, res) => {
    const notes = await getNotes();
    res.send(notes);
})

app.get('/notes/:id', async (req, res) => {
    const id = req.params.id;
    const note = await getNote(id);
    res.send(note);
})

app.post('/notes', async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const note = await createNote(title, description);
    res.send(note);
})

app.listen(8080, () => {
    console.log('Server is running on the port 8080');
});