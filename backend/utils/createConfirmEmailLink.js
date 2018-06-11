// url == "http://localhost:5000"
// => "http://localhost:5000/<id>"
export const createConfirmEmailLink = (username) => {
  return `http://localhost:5000/register/confirm/${username}`
}