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
    socketio.on("new-message", onReceiveMessage)
    return socketio
}

const onConnectionEstablished = () => {
    document.querySelector("#connection-status").innerText = "Connected"
    const messageInput = document.querySelector("#new-message")
    messageInput.disabled = false
    messageInput.focus()
}

const setUpListeners = (socket) => {
    window.onkeydown = (event) => waitForReturn(event, socket)
}

const waitForReturn = (event, socket) => {
    if (event.key === "Enter") {
        const messageBox = document.querySelector("#new-message").value
        const name = document.querySelector("#name").value || "anonymous"
        const message = `${name}: ${messageBox}`
        sendMessage(message, socket)
    }
}

const sendMessage = (message, socket) => {
    socket.emit("new-message", message)
    const newMessage = newMessageHtmlElement(AGENTS.SENDER, message)
    const messageHistoryElement = getMessageHistoryElement()
    messageHistoryElement.appendChild(newMessage)
    document.querySelector("#new-message").value = ""
}

const onReceiveMessage = (message) => {
    const newMessage = newMessageHtmlElement(AGENTS.RECEIVER, message)
    const messageHistoryElement = getMessageHistoryElement()
    messageHistoryElement.appendChild(newMessage)
}

const init = () => {
    const socket = connectToServer()
    setUpListeners(socket)
}

// helpers
const getMessageHistoryElement = () => {
    return document.querySelector("#messages-history")
}

init()
