import asyncHandler from "express-async-handler";
import { NextFunction, Request as ExpressRequest, Response } from "express";
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
const createConversation = asyncHandler(async (req: CustomInterface, res: Response) => {
  // const { userId } = req.user;
  const conversation = await Conversation.create({
    sender: req.body?.sender,
    receiver: req.body.receiver
  });

  res.status(200).json({ conversation });
});

// GET Review of the user conversation
//  Public
// send the conversation Id only
const getSingleUserConversation = asyncHandler(async (req: CustomInterface, res: Response) => {
  let userIdToRemove = "64f692e2374ae635be60219c"; // The _id to remove

  const conversations = await Conversation.find({
    $or: [{ sender: req.body?.userId }, { receiver: req.body?.userId }],
  }).populate("sender", " username bio display_name name profile_image_url")
    .populate("receiver", " username bio display_name name profile_image_url");

  // // Filter out conversations where either sender or receiver has _id equal to userIdToRemove
  // const filteredUserConversations = conversations?.filter(conversation => {
  //   // let userIdToRemove = "64f692e2374ae635be60219c";
  //   return (
  //     conversation?.sender?._id !== req.body?.userId &&
  //     conversation?.receiver?._id !== req.body?.userId
  //   );
  // });
  res.status(200).json({ conversations })
});


// GET All Gig
//  Public
// send the conversation Id only
const getAllConversation = asyncHandler(async (req: CustomInterface, res: Response) => {
  const { id } = req.params;
  // // find the Gig
  const conversation = await Conversation.
    find({ $or: [{ sender: id }, { receiver: id }], })
    .populate("sender", " username bio display_name name profile_image_url")
    .populate("receiver", " username bio display_name name profile_image_url");

  if (!conversation) {
    res.status(404);
    throw new Error("Gig not found");
  }

  res.status(200).json({ conversation });
});



// GET All Gig
//  Public
const DeleteConversation = asyncHandler(async (req: CustomInterface, res: Response) => {
  // res.status(200).json({ msg: "delete review controller" });
});

const UpdateConversation = asyncHandler(async (req: CustomInterface, res: Response) => {
  // // updating the Conversation
  // const updatedConversation = await Conversation.findByOneAndUpdate(
  //   { Id: req.params.Id },
  //   { readByBuyer: false, readBySeller: true },
  //   { new: true }
  // );
  // res.status(200).json({ updatedConversation });
});

export {
  createConversation,
  getSingleUserConversation,
  DeleteConversation,
  getAllConversation,
  UpdateConversation,
};
