import './App.css'
import { useState, useEffect, useRef } from 'react'
import { Input, Tabs } from 'antd'
import { useChat } from './hooks/useChat'
import styled from 'styled-components'
import Title from "../components/Title"
import Message from "../components/Message"
import ChatModal from '../components/ChatModals'


const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`;



const ChatRoom = () => {
    const { messages, sendMessage, me, displayStatus, startChat } = useChat()
    const [chatBoxes, setChatBoxes] = useState([])
    const [activeKey, setActiveKey] = useState('')
    const [msg, setMsg] = useState('')
    const [msgSent, setMsgSent] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const msgRef = useRef(null)
    const msgFooter = useRef(null)
    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView
            ({ behavior: 'smooth', block: "start" });
    };
    const renderChat = () => {
        return (messages.length === 0 ? (
            <p style={{ color: '#ccc' }}> No messages... </p>
        ) : (
            messages.map(({ sender, body }, i) => (
                <Message isMe={sender === me} message={body} key={i} ref={i === messages.length - 1 ? null : msgFooter} />
            ))
        ))
    }
    const extractChat = (friend) => {
        let message = messages.filter(({ sender, body }) => sender === me || sender === friend)
        return (renderChat(message))
    }
    const createChatBox = (friend) => {
        if (chatBoxes.some
            (({ key }) => key === friend)) {
            throw new Error(friend +
                "'s chat box has already opened.");
        }
        const chat = extractChat(activeKey);
        setChatBoxes([...chatBoxes,
        {
            label: friend, children: chat,
            key: friend
        }]);
        setMsgSent(true);
        return friend;
    };
    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({ key }) => key === targetKey);
        const newChatBox = chatBoxes.filter(({ key }) => key !== targetKey);
        setChatBoxes(newChatBox);
        return activeKey
            ?
            activeKey === targetKey
                ? index === 0
                    ? ''
                    : chatBoxes[index - 1].key
                : activeKey
            : '';
    }
    const reload = () => {
        // const chat = renderChat();
        const chat = extractChat(activeKey)
        let newChatBox = chatBoxes.map((chatBox) => {
            if (chatBox.key === activeKey) {
                return { ...chatBox, children: chat };
            }
            else {
                return chatBox
            }
        })
        setChatBoxes(newChatBox);
    }
    useEffect(() => {
        scrollToBottom();
        setMsgSent(false);
    }, [msgSent, chatBoxes])

    useEffect(() => {
        reload();
    }, [messages])

    return (
        <>
            <Title name={me} />
            {/* <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div> */}
            <ChatBoxesWrapper
                tabBarStyle={{ height: '36px' }}
                type="editable-card"
                activeKey={activeKey}
                onChange={(key) => {
                    setActiveKey(key)
                    startChat(me, key);
                }
                }
                onEdit={(targetKey, action) => {
                    if (action === 'add') setModalOpen(true);
                    else if (action === 'remove') {
                        setActiveKey(removeChatBox(targetKey, activeKey));
                    }
                }}
                items={chatBoxes}
            />
            <ChatModal
                open={modalOpen}
                onCreate={({ name }) => {
                    startChat(me, name);
                    setActiveKey(createChatBox(name));
                    setModalOpen(false);
                }}
                onCancel={() => { setModalOpen(false) }} />
            {/* <FootRef ref={msgFooter} /> */}
            {/* <div className="App-messages">
                {messages.length === 0 ? (
                    <p style={{ color: '#ccc' }}> No messages... </p>
                ) : (
                    messages.map(({ name, body }, i) => (
                        <p className="App-message" key={i}>
                            <Tag color="blue">{name}</Tag> {body}
                        </p>
                    ))
                )}
            </div> */}
            {/* <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ marginBottom: 10 }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        msgRef.current.focus()
                    }
                }}
            ></Input> */}
            <Input.Search
                ref={msgRef}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                enterButton="Send"
                placeholder="Type a message here..."
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter a message body.'
                        })
                        return
                    }
                    sendMessage(me, activeKey, msg)
                    setMsg('')
                    setMsgSent(true)
                }}
            ></Input.Search>
        </>
    )
}

export default ChatRoom
