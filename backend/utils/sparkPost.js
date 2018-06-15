import SparkPost from 'sparkpost'

const client = new SparkPost('224064f66bd076284d61faaf1343ae7d02647b60')

export const sendEmail = async (receipient, url) => {
  const response = await client.transmissions.send({
    options: {
      sandbox: true
    },
    content: {
      from: 'cryptogons@sparkpostbox.com',
      subject: 'Confirm Email',
      html:
      `<html>
        <body>
          <p>Testing SparkPost2</p>
          <a href="${url}">confirm email</a>
        </body>
      </html>`
    },
    recipients: [{ address: receipient }]
  })
  console.log(response)
}

export default null
