const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const msg1 = document.getElementById('msg1')
const msg2 = document.getElementById('msg2')
const lastSeen = document.getElementById('lastSeen')

msg1.textContent = "Type a location to know the weather."

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const location = searchElement.value

    msg1.textContent = "Loading......."
    msg2.textContent = " "
    lastSeen.textContent = ""

    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                msg1.textContent = ""
                msg2.textContent = data.error
            } else {
                msg1.textContent = `${data.location}`
                msg2.textContent = `${data.forecast}`
                lastSeen.textContent = `${data.lastSeen}`
            }
        })
    })
})