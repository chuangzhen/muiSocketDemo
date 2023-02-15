import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBody = ({ messages, lastMessageRef, typingStatus ,socket}) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');

    //退出登录客户端主动断开连接，不刷新页面
    // socket.disconnect()

    // 刷新页面会触发disconnect事件，重新建立新的socket连接
    window.location.reload();
  };

  return (
    <>
    <header className="chat__mainHeader">
      <p>与朋友聚会</p>
      <button className="leaveChat__btn" onClick={handleLeaveChat}>
        离开聊天
      </button>
    </header>

    <div className="message__container">
      {messages.map((message) =>
        message.name === localStorage.getItem('userName') ? (
          <div className="message__chats" key={message.id}>
            <p className="sender__name">你</p>
            <div className="message__sender">
              <p>{message.text}</p>
            </div>
          </div>
        ) : (
          <div className="message__chats" key={message.id}>
            <p>{message.name}</p>
            <div className="message__recipient">
              <p>{message.text}</p>
            </div>
          </div>
        )
      )}

      <div className="message__status">
        <p>{typingStatus}</p>
      </div>
      <div ref={lastMessageRef} />
    </div>
  </>
  );
};

export default ChatBody;