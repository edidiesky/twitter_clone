import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { MdAddReaction, MdOutlineAddCircle } from "react-icons/md";
import { AiFillPicture } from "react-icons/ai";
import { IoSend } from 'react-icons/io5'
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxtoolkit';
import { Createmessage, GetSinglemessageDetails } from '../../../features/message/messageReducer';
import moment from 'moment';
import { Createconversation, GetUserconversationDetails } from '../../../features/conversation/conversationReducer';
import ListContent from '../list';



const MessageContent: React.FC = () => {
  const { id } = useParams()
  const [messages, setMessages] = useState<string>('')
  const dispatch = useAppDispatch()
  const { message } = useAppSelector(store => store.message)
  const { conversationDetails } = useAppSelector(store => store.conversation)
  const { userInfo } = useAppSelector(store => store.auth)
 
  useEffect(() => {
    if(conversationDetails) {
      dispatch(GetSinglemessageDetails(conversationDetails?._id))
    }
   
  }, [conversationDetails])

  const handleCreateMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(Createmessage({
      message: messages,
      userId: userInfo?._id,
      conversationId: conversationDetails?._id
    }))
    setMessages('')
  }

  const sendercreatedAt = moment(conversationDetails?.sender?.createdAt).format('MMMM, h:mm a')
  const receivercreatedAt = moment(conversationDetails?.receiver?.createdAt).format('MMMM, h:mm a')
  return (
    <ChatContentStyles className='flex flex-1 column item-center'>
      {
        conversationDetails ? <div className="chatWrapper w-100">
          <div className="top2 w-100 auto ">
            <div className="w-90 auto flex item-center justify-space">
              <h3 className="fs-20 text-bold text-dark">
                {
                  conversationDetails?.sender?._id !== userInfo?._id ?
                    conversationDetails?.sender?.display_name : conversationDetails?.receiver?.display_name
                }

              </h3>

            </div>

          </div>
          {/* chat user profile and messages */}
          <div className="flex chatWrap w-100 auto list auto column gap-1">
            {
              conversationDetails?.sender?._id !== userInfo?._id ? <Link to={`/${conversationDetails?.sender?.name}`} className="top w-90 auto flex column item-center justify-center gap-2">
                <div className="flex column gap-1 item-center justify-center w-100">
                  <div className="image_wrapper">
                    <div className="image_gradient"></div>
                    <img src={conversationDetails?.sender?.profile_image_url} alt="" className="avatar_profile" />
                  </div>
                  <h4 className="fs-16 text-center text-bold text-dark">{conversationDetails?.sender?.display_name}
                    <span className="block fs-14 text-grey text-light">@{conversationDetails?.sender?.name}</span>
                  </h4>
                </div>
                <h4 className="w-100 bio auto text-center fs-15 text-light text-dark">
                  {conversationDetails?.sender?.bio}
                </h4>
                <h4 className="w-85 auto text-center fs-14 text-light text-grey">

                  Joined {sendercreatedAt}
                  ·
                  4,127 Followers
                </h4>
              </Link> : conversationDetails?.receiver?._id !== userInfo?._id ? <Link to={`/${conversationDetails?.receiver?.name}`} className="top w-90 auto flex column item-center justify-center gap-2">
                <div className="flex column gap-1 item-center justify-center w-100">
                  <div className="image_wrapper">
                    <div className="image_gradient"></div>
                    <img src={conversationDetails?.receiver?.profile_image_url} alt="" className="avatar_profile" />
                  </div>
                  <h4 className="fs-16 text-center text-bold text-dark">{conversationDetails?.receiver?.display_name}
                    <span className="block fs-14 text-grey text-light">@{conversationDetails?.receiver?.name}</span>
                  </h4>
                </div>
                <h4 className="w-100 bio auto text-center fs-15 text-light text-dark">
                  {conversationDetails?.receiver?.bio}
                </h4>
                <h4 className="w-85 auto text-center fs-14 text-light text-grey">

                  Joined {receivercreatedAt}
                  ·
                  4,127 Followers
                </h4>
              </Link> : ''
            }

            <div className="w-85 auto chatList column flex gap-2">
              {message?.map((x: { sender: any; createdAt: moment.MomentInput; message: any }) => {
                const usermessage = x?.sender === userInfo?._id
                const createdAt = moment(x?.createdAt).format('MMMM Do YYYY, h:mm a')
                return (
                  <div className="flex ">
                    <div className="chatCard flex w-100 column">
                      {
                        !usermessage ? <div className="flex column gap-1">
                          <div className=" SenderChat">
                            <h4 className="fs-14 text-grey text-light">
                              {x?.message}
                            </h4>
                          </div>
                          <div className=" flex gap-1">
                            <h5 className="fs-14 text-light text-grey">
                              {createdAt}
                            </h5>
                          </div>
                        </div>
                          : <div className="flex revieverWrapper column gap-1">
                            <div className="flex wrap revieverWrapper column">
                              <div className="recieverChat">
                                <h4 className="fs-14 text-white text-light">
                                  {x?.message}
                                </h4>
                              </div>

                            </div>
                            <div className=" flex gap-1">
                              <h5 className="fs-14 text-light text-grey">
                                {createdAt}
                              </h5>
                            </div>

                          </div>
                      }

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* search */}
          <div className="form_wrapper w-100 auto">
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleCreateMessage(e)} action="" className="w-100 family1 auto flex item-center">
              <div className="flex item-center">
                <div className="icons flex item-center justify-center avatar">
                  <MdAddReaction className="fs-20" color={'var(--blue-1)'} />
                </div>
                <div className="icons flex item-center justify-center avatar">
                  <MdOutlineAddCircle className="fs-20" color={'var(--blue-1)'} />
                </div>
                <div className="icons flex item-center justify-center avatar">
                  <AiFillPicture className="fs-20" color={'var(--blue-1)'} />
                </div>
              </div>
              <input
                type="text"
                value={messages}
                name='messages'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessages(e.target.value)}
                placeholder="Start a new Message"
                className="input fs-15 flex-1 text-dark family1"
              />
              <div className="icons flex item-center justify-center avatar">
                <IoSend className="fs-20" color={'var(--blue-1)'} />
              </div>
            </form>
          </div>

        </div>
          : <ListContent/>
      }
     
    </ChatContentStyles>
  )
}

const ChatContentStyles = styled.div`
height: 100vh;
overflow:hidden;
overflow: auto;

/* background-color: red; */
  .tweet_user {
        overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* max-width: 250px; */
  @media (max-width:580px) {
    max-width: 290px;
  }
  @media (max-width:500px) {
    max-width: 180px;
  }
   @media (max-width:380px) {
    max-width: 150px;
  }
  
    }
.bio {
  width: 70%;
  @media (max-width:980px) {
  width: 70%;

  }
   @media (max-width:480px) {
  width: 90%;

  }
}
.top2 {
position: sticky;
  top: 0;
  background-color: var(--top);
  z-index: 300;
  padding: 2rem 0;
  backdrop-filter: blur(12px);
        }
        .chatWrap {
          /* height: 85vh; */
    overflow: auto;
    height: 100vh;
    padding-bottom: 15rem;
    /* width: 85%;
    height: 100vh; */
          background-color: var(--white);
        }
   .chatWrapper {
    border-right : 1px solid var(--border);
border-left : 1px solid var(--border);
overflow:auto;
    height: 100vh;

overflow:hidden;

   }
   .list {
height: 100%;
    overflow: auto;
   }
      .image_wrapper {
      width:6rem;
      height:6rem;
      border-radius:50%;
      cursor:pointer;
      position: relative;
      &:hover {
        .image_gradient{
          opacity:1;
        }
      }
      .chatList{
        border-top: 1px solid rgba(0,0,0,.1);
        padding-top: 4rem;
        padding-right: 2rem;
      }
      .image_gradient {
      width:100%;
      height:100%;
      border-radius:50%;
      /* transform: translateY(-100%); */
      position: absolute;
      background:rgba(0,0,0,1) !important;
      opacity:0;
      transition:all .5s;
    }
    .avatar_profile {
      width:100%;
      height:100%;
      border-radius:50%;
      /* transform: translateY(-100%); */
      position: absolute;
      
    }
    }
    .revieverWrapper {
    justify-content: flex-end;
    gap: 1.2rem;
    align-self: flex-end;
    position: relative;
  }
  .SenderChat {
    background-color: var(--grey-3);
   &:nth-child(1) {
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    border-bottom-right-radius: 30px;
   }
   border-radius: 24px;
   border-bottom-left-radius: 4px;
  }
  .recieverChat {
   border-radius: 24px;
   border-bottom-right-radius: 4px;
   background-color: var(--blue-1);
  }
  .SenderChat,
  .recieverChat {
    padding: 1.5rem;
    width: fit-content;
    @media (max-width: 980px) {
      background-color: #fff;
      padding: 2rem 4rem;
    }
  }
  .chatCard {
    display: flex;
    display: flex;
    align-items: flex-start;
  }
    .top {
    padding:5rem 1.5rem;
    border-bottom: 1px solid var(--border);

        &:hover {

        background-color: var(--grey-2);
    }
    }

    .avatar {
    width: 4rem;
    height: 4rem;
  }
  .form_wrapper {
  background-color:var(--top);
    z-index: 300;
  backdrop-filter: blur(12px);
    border-top: 1px solid var(--border);

    padding: 1rem 2rem;
     position: sticky;
    bottom: 0%;
    left: 0;
    form {
   
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .2rem 2rem;
    gap: 0.5rem;
    border-radius: 40px;
    background-color: #EFF3F4;

    .input {
      height: 3.8rem;
      background-color: inherit;
      border-radius: 40px;
      position: sticky;
      top: 0;
      z-index: 3000;
      padding: 0 2rem;
    }
  }
  }

  `

export default MessageContent