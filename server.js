const app = require('./app/app');
const db = require('./database/postgres');
require('./config/config')
db.authenticate()
    .then(() => console.log('Database Connected'))
    .catch(err => console.log('Error :' + err))

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})