import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const conversationurl: string = "/api/v1/conversation";
type conversationdatatype = {
  conversation_text?: string;
  conversation_image?: any;
  _id?: string;
  conversation_user_id?:string;
}

interface conversationPayload {
  userIdIncludedInBookmarksArray: boolean;
  conversationdetails: any;
}

type KnownError = {
  errorMessage: string;
}

export const getAllconversation = createAsyncThunk<{
  rejectValue: KnownError,

}>(
  "getAllconversation",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(conversationurl);
      localStorage.setItem("conversation", JSON.stringify(response.data.conversation));
      return response.data.conversation;
    } catch (err: any) {
      const message = err.response && err.response.data.message
        ? err.response.data.message
        : err.message
      return rejectWithValue(message);

    }
  }
);


// Create User conversation
export const Createconversation = createAsyncThunk<{
  rejectValue: KnownError,
}, conversationdatatype>(
  "Createconversation",
  async (conversationData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState() as { auth: { token: string } };
      const config = {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      };
      
        const response2 = await axios.post(
          `/api/v1/conversation/${conversationData?._id}`,
          conversationData,
          config
        );
        return response2.data.conversation;
    
     
      // console.log(conversationData)
    } catch (err: any) {
      const message = err.response && err.response.data.message
        ? err.response.data.message
        : err.message
      return rejectWithValue(message);

    }
  }
);

// Deelete User conversation
export const Deleteconversation = createAsyncThunk<{
  rejectValue: KnownError,
}, { _id?: string }>(
  "deleteconversation",
  async (Detailsdata, { rejectWithValue, getState }) => {

    try {
      const { auth } = getState() as { auth: { token: string } };
      // console.log(auth.token)
      // console.log(conversationdata?._id)
      const config = {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      };
      await axios.delete(
        `/api/v1/conversation/${Detailsdata}`,
        config
      );
      return Detailsdata;

    } catch (err: any) {
      const message = err.response && err.response.data.message
        ? err.response.data.message
        : err.message
      return rejectWithValue(message);

    }
  }
);


// Getconversation Details
export const GetSingleconversationDetails = createAsyncThunk < conversationPayload,{
  rejectValue: KnownError,
}>(
  "GetSingleconversationTweetDetails",
  async (Detailsdata, { rejectWithValue, getState }) => {

    try {
      const { auth } = getState() as { auth: { conversationInfo: { _id: String }, token: string } };
    
      const config = {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.get(
        `/api/v1/conversation/tweet/${Detailsdata}`,
        config
      );
      return response.data.conversation

    } catch (err: any) {
      const message = err.response && err.response.data.message
        ? err.response.data.message
        : err.message
      return rejectWithValue(message);

    }
  }
);

// Get User conversation
export const GetUserconversation = createAsyncThunk<{
  rejectValue: KnownError,
}, {_id?:any}>(
  "GetUserconversation",
  async (Detailsdata, { rejectWithValue, getState }) => {

    try {
      const { auth } = getState() as { auth: { conversationInfo: { _id: String }, token: string } };

      const config = {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.get(
        `/api/v1/conversation/user/${Detailsdata}`,
        config
      );
      return response.data.conversation;
      // console.log(Detailsdata)

    } catch (err: any) {
      const message = err.response && err.response.data.message
        ? err.response.data.message
        : err.message
      return rejectWithValue(message);

    }
  }
);
