const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users, tasks } = require('./data');
const app = express();

app.use(express.json());



app.use('/',require('./routes/userRoute'))
app.use('/',require('./routes/taskRoute'))

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: 'Internal Server Error' });
});

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
