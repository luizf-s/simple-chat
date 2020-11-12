const socketio = io()

const AGENTS = {
    SENDER: 0,
    RECEIVER: 1
}

const tempRenderFirstMessages = () => {
    const messagesHistory = document.querySelector("#messages-history")
    const initHtml = `
        <div class="message my-message">
            <p>I sent this</p>
        </div>
        <div class="message remote-message">
            <p>I received this</p>
        </div>
    `
    messagesHistory.innerHTML = initHtml
    const newMessageSender = newMessageHtmlElement(AGENTS.SENDER, "this one is new")
    const newMessageReceiver = newMessageHtmlElement(AGENTS.RECEIVER, "this one is new too")
    const newMessageReceiver2 = newMessageHtmlElement(AGENTS.RECEIVER, "and finally")
    messagesHistory.appendChild(newMessageSender)
    messagesHistory.appendChild(newMessageReceiver)
    messagesHistory.appendChild(newMessageReceiver2)
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
    socketio.on("connect", () => { alert("Connected") })
    onConnectionEstablished()
}

const onConnectionEstablished = () => {
    document.querySelector("#connection-status").innerText = "Connected"
}

const onInit = () => {
    tempRenderFirstMessages()
    connectToServer()
}

onInit()
