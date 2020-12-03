const {Pool} = require('pg');
const {getScript, runBackup} = require('./functions');


const getUsers = async (req, res) => {
    const config = {
        host: 'localhost',
        database: 'ejemplo',
        user: 'postgres',
        password: '',
        port: '5432',
    }

    const pool = new Pool(config);
    const response = await pool.query('select * from users');
    res.send(response.rows.map(row => row));
};

const dbBackup = async (req, res) => {
    const date = new Date();
    const backupFileName = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-${date.getMinutes()}`;
    const fileFormat = 'sql';
    const script = getScript(backupFileName, fileFormat);

    const emailData = {
        remittentInfo: {
            service: 'Gmail',
            auth: {
                user: "google-email",
                pass: "password",
            },
        },
        mailOptions: {
            from : "remitant",
            to: "reciber-email",
            subject: "email-subject",
            text: "email-text",
        }
    }

    runBackup(req, res, script, backupFileName, emailData);
    
}

module.exports = {
    getUsers,
    dbBackup,
}