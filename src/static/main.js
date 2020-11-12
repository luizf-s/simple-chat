const AGENTS = {
    SENDER: 0,
    RECEIVER: 1
}

const newMessageHtmlElement = (agent, text) => {
    const agentStyle = agent == AGENTS.SENDER ? "my-message" : "remote-message"

    const messageHtmlElement = document.createElement("div")
    messageHtmlElement.className = `message ${agentStyle}`

    const innerTextHtmlElement = document.createElement("p")
    innerTextHtmlElement.innerText = text

    messageHtmlElement.appendChild(innerTextHtmlElement)

    return messageHtmlElement
}

const connectToServer = () => {
    const socketio = io()
    socketio.on("connect", () => { onConnectionEstablished() })
    socketio.on("message", onReceiveMessage)
}

const onConnectionEstablished = () => {
    document.querySelector("#connection-status").innerText = "Connected"
    const messageInput = document.querySelector("#new-message")
    messageInput.disabled = false
    messageInput.focus()
}

const setUpListeners = () => {
    window.onkeydown = waitForReturn
}

const waitForReturn = event => {
    if (event.key === "Enter") {
        const message = document.querySelector("#new-message").value
        sendMessage(message)
    }
}

const sendMessage = message => {
    console.log(message)
}

const onReceiveMessage = (message) => {
    const newMessage = newMessageHtmlElement(AGENTS.RECEIVER, message)
    const messageHistoryElement = getMessageHistoryElement()
    messageHistoryElement.appendChild(newMessage)
}

const onInit = () => {
    connectToServer()
    setUpListeners()
}

// helpers
const getMessageHistoryElement = () => {
    return document.querySelector("#messages-history")
}

onInit()
