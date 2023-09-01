import {createTransport} from "nodemailer"

export const sendEmail = async (to,subject,text) => {

    const transporter = createTransport({
        host: 'smtp.gmail.com',
        // port: process.env.SMTP_PORT,
        auth: {
            user: 'champakiyaaa@gmail.com',
            pass: 'lxlqqagnidbuxrru',
        },
    });
    await transporter.sendMail({
        to,subject,text,from:"myid2gmail.com"
    },function (err,info){
        if(err) console.log(err);
        else console.log(info.response);
    })
}