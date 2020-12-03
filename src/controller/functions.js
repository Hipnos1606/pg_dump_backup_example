require('dotenv').config();
const nodemailer = require('nodemailer');
const exec = require('child_process').exec;
const path = require('path');

const getScript = (fileName, fileFormat) => {
    const db_name = process.env.DB_NAME;
    const db_user = process.env.DB_USER;
    return `pg_dump --username=${db_user} ${db_name} -f ./src/controller/backups/${fileName}.${fileFormat}`;;
}

const sendMail = async ({remittentInfo, mailOptions}) => {
    try {
        const transporter = nodemailer.createTransport(remittentInfo);
        return transporter.sendMail(mailOptions);
    } catch (err) {
        return err
    }
}

const runBackup = (req, res, script, backupFileName, emailData) => {
    exec(script, (err, stdout) => {
        if (err) {
            res.status(500).send(err);
        }
        const filePath = path.join(__dirname, `/backups/${backupFileName}.sql`);

        // aquí modificaremos las opciones del correo para agregarle el archivo backup
        Object.defineProperties(emailData, {
            "mailOptions": {
                value: {
                    ...emailData.mailOptions,
                    attachments: [{
                        path: filePath,
                    }],
                },
                writable: true,
            }
        })

        sendMail(emailData)
            .then((response) => {
                res.status(200).send(response);
            })
            .catch(err => {
                res.status(err.responseCode).send(err);
            });
    });
}

module.exports = {
    getScript,
    runBackup,
}