import mongoose from "mongoose";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Check if a conversation already exists between sender and receiver
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!conversation) {
            // Create a new conversation if it doesn't exist
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        //sockit io functionality -> Pending


        // Save the new message
        // await newMessage.save();

        // Add the message to the conversation
        // await conversation.save();


        //this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);



        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller ", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages"); //append actual messages

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller ", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}