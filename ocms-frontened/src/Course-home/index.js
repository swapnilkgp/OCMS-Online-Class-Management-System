import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import Error from "../Error";

const Index = () => {
  const userID = localStorage.getItem("userID");
  const coursecode = localStorage.getItem("coursecode");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [conv, setConv] = useState("");
  const [isConv, setIsConv] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/getmessages/",
      data: {
        coursecode: coursecode,
      },
    })
      .then((obj) => {
        setMessages(obj.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const sendmsg = () => {
    if (conv == "") {
      setError(true);
    } else {
      const date = new Date();
      const minute = date.getMinutes();

      if (date.getMinutes < 10) {
        const minuete = "0" + date.getMinutes();
      }
      const today =
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
      axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/sendmessage/",
        data: {
          coursecode: coursecode,
          sender: userID,
          msg: conv,
          date: today,
          time: date.getHours() + ":" + minute,
        },
      })
        .then((res) => {
          axios({
            method: "POST",
            url: "http://127.0.0.1:8000/api/getmessages/",
            data: {
              coursecode: coursecode,
            },
          })
            .then((obj) => {
              setMessages(obj.data);
            })
            .catch((e) => {
              console.log(e);
            });
          setIsConv(false);
          setConv(" ");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <>
      <nav className="navbar1">
        <div>Messages</div>
      </nav>
      <div className="Rightside ">
        <div className={isConv ? "msglist1" : "msglist"}>
          {messages.map((message) => {
            return (
              <>
                {username == message.sender ? (
                  <div key={message.id} className="msgbox1">
                    <div className="msgtop">
                      <p className="circle">{message.logo}</p>
                      <p className="sender">{message.sender}</p>
                      <p>{message.date}</p>
                      <p>{message.time}</p>
                    </div>
                    <p className="msg">{message.msg}</p>
                  </div>
                ) : (
                  <div key={message.id} className="msgbox">
                    <div className="msgtop">
                      <p className="circle">{message.logo}</p>
                      <p className="sender">{message.sender}</p>
                      <p>{message.date}</p>
                      <p>{message.time}</p>
                    </div>
                    <p className="msg">{message.msg}</p>
                  </div>
                )}
              </>
            );
          })}
        </div>
        <article className="bottombar">
          {isConv && (
            <div className="formb">
              <div className="formb-control">
                <input
                  type="text"
                  id="conv"
                  name="conv"
                  value={conv}
                  placeholder="Start a new conversation"
                  onChange={(e) => {
                    setConv(e.target.value);
                  }}
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      sendmsg();
                    }
                  }}
                />
                <div style={{ paddingTop: "5px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    class="bi bi-send"
                    viewBox="0 0 16 16"
                    onClick={sendmsg}
                  >
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                  </svg>
                </div>
                <div></div>
                <div style={{ color: "red" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    fill="currentColor"
                    class="bi bi-x-lg"
                    viewBox="0 0 16 16"
                    onClick={() => {
                      setConv("");
                      setIsConv(false);
                    }}
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          <p className="btn" onClick={() => setIsConv(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-chat-right"
              viewBox="0 0 16 16"
            >
              <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
            </svg>
            {"    "}Start new conversation
          </p>
        </article>
        {error && (
          <Error
            message={"Please Type a Message before Sending"}
            handleError={(e) => {
              e.preventDefault();
              setError(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Index;
