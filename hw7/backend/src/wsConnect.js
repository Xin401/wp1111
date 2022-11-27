import { UserModel, MessageModel, ChatBoxModel } from "./models/chatbox";
const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}
const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}
const chatBoxes = {}
const broadcastMessage = (wss, data, status, chatBoxName) => {
    console.log(Array.from(chatBoxes[chatBoxName]))
    const inRoom = Array.from(chatBoxes[chatBoxName])
    inRoom.map((room) => {
        sendData(data, room);
        sendStatus(status, room);
    })
    // const inroom = Array.from(chatBoxes)
    // wss.clients.forEach((client) => {
    //     sendData(data, client);
    //     sendStatus(status, client);
    // });
};
const makeName = (name, to) => {
    return [name, to].sort().join('_');
}

const validateUser = async (name) => {
    console.log("Finding..." + name)
    let existing = await UserModel.findOne({ name });
    if (!existing) {
        existing = await new UserModel
            ({ name }).save();
    }
    return existing;
}
const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box) {
        box = await new ChatBoxModel
            ({ name, users: [participants[0]._id, participants[1]._id] }).save();
    }
    participants[0].chatBoxes.push(box._id)
    participants[1].chatBoxes.push(box._id)
    participants[0].save();
    participants[1].save();
    return await box.populate
        (["users", { path: 'messages', populate: 'sender' }]);
};
export default {

    onMessage: (wss, ws) => (
        async (byteString) => {
            const { data } = byteString
            const { type, payload } = JSON.parse(data)
            switch (type) {
                // case 'input': {
                //     // save payload to db
                //     const { name, body } = payload;
                //     const message
                //         = new Message({ name, body })
                //     try {
                //         await message.save();
                //     } catch (e) {
                //         throw new Error
                //             ("Message DB save error: " + e);
                //     }
                //     // response to client
                //     broadcastMessage(wss, ['output', [payload]], {
                //         type: 'success',
                //         msg: 'Message sent.'
                //     })
                //     break
                // }
                case 'Chat': {
                    const { name, to } = payload;
                    const chatBoxName = makeName(name, to);
                    if (ws.box !== "" && chatBoxes[ws.box]) {
                        // user(ws) was in another chatbox
                        chatBoxes[ws.box].delete(ws);
                    }
                    ws.box = chatBoxName;
                    if (!chatBoxes[chatBoxName]) {
                        chatBoxes[chatBoxName] = new Set();
                    }
                    chatBoxes[chatBoxName].add(ws);
                    const me = await validateUser(name)
                    const friend = await validateUser(to)
                    let box = await validateChatBox(chatBoxName, [me, friend]);
                    let messages = await box.messages.map((message) => {
                        return { sender: message.sender.name, body: message.body }
                    })
                    broadcastMessage(wss, ['init', messages], {
                        type: 'success',
                        msg: 'Message sent.'
                    }, chatBoxName)
                    break;
                }
                case 'MESSAGE': {
                    const { name, to, body } = payload;
                    const chatBoxName = makeName(name, to);
                    const me = await validateUser(name)
                    const friend = await validateUser(to)
                    let box = await validateChatBox(chatBoxName, [me, friend]);
                    let msg = await new MessageModel
                        ({ chatBox: box._id, sender: me._id, body }).save();
                    box.messages.push(msg._id);
                    box.save();
                    console.log(msg)
                    broadcastMessage(wss, ['output', [{ sender: name, body: body }]], {
                        type: 'success',
                        msg: 'Message sent.'
                    }, chatBoxName)
                    break;
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                        broadcastMessage(wss, ['cleared'], {
                            type: 'info',
                            msg: 'Message cache cleared.'
                        })
                    })
                    break
                }
                default: break;
            }
        })
}