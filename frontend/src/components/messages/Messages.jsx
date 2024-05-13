import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton'

const Messages = () => {
  const { loading, messages } = useGetMessages()
  //console.log("messages ", messages)

  const lastMessageRef = useRef()

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}


      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {/* if no messages is send between them  */}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  )
}

export default Messages