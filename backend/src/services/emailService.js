const mailjet = require("../config/email")

const send = (users) => {
    const Messages = users.map((user) => {
        return {
            From: {
                Email: "alessandro.tw10@gmail.com",
                Name: "Alessandro",
            },
            To: [
                {
                    Email: user.email,
                    Name: user.name,
                },
            ],
            Subject: "Seu amigo secreto!",
            TextPart: "Seu amigo secreto!",
            HTMLPart: `<h3>Resultado do sorteio de amigo secreto</h3><br />Olá ${user.name}, o seu amigo secreto é ${user.friend.name}`,
            CustomID: "ad-2019",
        }
    })
    const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages,
    })
    request
        .then((result) => {})
        .catch((error) => {
            throw error
        })
}

module.exports = { send }
