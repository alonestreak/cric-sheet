// const apiKey='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'
const sgMail= require('@sendgrid/mail')
sgMail.setApiKey(process.env.apiKey)
sgMail.send({
    to:'sawantsushant061@gmail.com',
    from:'sawantsushant061@gmail.com',
    subject:'this is first email',
    text:'i hope this ges to you'
})

const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'sawantsushant061@gmail.com',
        subject:'welcome to the app',
        text:`welcome to the app ${name}, Let me know how you get along with the app`
    })
}

const deleteEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'sawantsushant061@gmail.com',
        subject:'Sorry to see you go!!!',
        text:`goodbye ${name}`
    })
}

module.exports={
    sendWelcomeEmail,deleteEmail
}