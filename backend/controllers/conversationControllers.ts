import asyncHandler from "express-async-handler";
import { NextFunction, Request as ExpressRequest, Response, Request } from "express";
import Conversation from "../models/Conversation";
interface CustomInterface extends ExpressRequest {
  user?: {
    userId?: String;
    // Add other properties related to the user if needed
  };
}

// POST
// Create Conversation
//  Public
const createConversation = asyncHandler(async (req: CustomInterface, res: Response, next: NextFunction) => {
  // const { userId } = req.user;
  const { receiverId, senderId } = req.body
  // console.log(receiverId, senderId)
  // check for any exusting conversation
  const existingConversations = await Conversation.findOne({
    $or: [
      {
        sender: senderId,
        receiver: receiverId
      },
      {
        sender: receiverId,
        receiver: senderId
      },
    ]
  })

  // console.log(existingConversations?.length)
  
  if (existingConversations) {
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    res.status(200).json({ conversation:existingConversations })

  } else {

    // create a users conversation
    await Conversation.create({
      sender: senderId,
      receiver: receiverId
    })

    // get the users conversation
    const conversation = await Conversation.find({
      $or: [{ sender: req.user?.userId }, { receiver: req.user?.userId }],
    }).populate("sender", " username bio display_name name profile_image_url")
      .populate("receiver", " username bio display_name name profile_image_url");


    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    res.status(200).json({ conversation: conversation })
  }


});

// GET Review of the user conversation
//  Public
// send the conversation Id only
const getUserConversation = asyncHandler(async (req: CustomInterface, res: Response) => {
  let userIdToRemove = "64f692e2374ae635be60219c"; // The _id to remove

  const conversations = await Conversation.find({
    $or: [{ sender: req.user?.userId }, { receiver: req.user?.userId }],
  }).populate("sender", " username bio display_name name profile_image_url")
    .populate("receiver", " username bio display_name name profile_image_url");
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.status(200).json({ conversations })
});


// GET All Gig
//  Public
// send the conversation Id only
const getSingleConversation = asyncHandler(async (req: CustomInterface, res: Response) => {
  const { receiverId, senderId } = req.params;
  // // find the Gig
  const conversation = await Conversation.findOne({
    $or: [
      {
        sender: senderId,
        receiver: receiverId
      },
      {
        receiver: senderId,
        sender: receiverId
      }
    ]
  })
    .populate("sender", " username bio display_name name profile_image_url")
    .populate("receiver", " username bio display_name name profile_image_url");

  if (!conversation) {
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    res.status(200).json({ conversation:null });
  }

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.status(200).json({ conversation });
});



// GET All Gig
//  Public
const DeleteConversation = asyncHandler(async (req: CustomInterface, res: Response) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");// 
  res.status(200).json({ msg: "delete review controller" });
});

const UpdateConversation = asyncHandler(async (req: CustomInterface, res: Response) => {
  // // updating the Conversation
  // const updatedConversation = await Conversation.findByOneAndUpdate(
  //   { Id: req.params.Id },
  //   { readByBuyer: false, readBySeller: true },
  //   { new: true }
  // );
  //   res.setHeader("Content-Type", "text/html");
  // res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");// 
  //   res.status(200).json({ updatedConversation });
});

export {
  createConversation,
  getUserConversation,
  DeleteConversation,
  getSingleConversation,
  UpdateConversation,
};
