import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const Quoteurl: string = "/api/v1/Quote";
type Quotedatatype = {
  quote_text?: string;
  quote_image?: any;
  _id?: string;
  quote_user_id: {
    _id?: string;
    display_name?: string;
    name?: string;
    bio?: string;
    profile_image_url?: string;

  }
}

interface BookMarkAQuotePayload {
  userIdIncludedInBookmarksArray: boolean;
  Quotedetails: any;
}

type KnownError = {
  errorMessage: string;
}

export const getAllQuote = createAsyncThunk<{
  rejectValue: KnownError,

}>(
  "getAllQuote",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(Quoteurl);
      localStorage.setItem("Quote", JSON.stringify(response.data.Quote));
      return response.data.quote;
    } catch (err: any) {
      const message = err.response && err.response.data.message
        ? err.response.data.message
        : err.message
      return rejectWithValue(message);

    }
  }
);

export const getAllBookmarkedQuote = createAsyncThunk<{
  rejectValue: KnownError,

}>(
  "getAllBookmarkedQuote",
  async (QuoteData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState() as { auth: { token: string } };
      const config = {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.get('/api/v1/quote/bookmark', config);
    return response.data.bookmarkQuotes;
    } catch (err: any) {
      const message = err.response && err.response.data.message
        ? err.response.data.message
        : err.message
      return rejectWithValue(message);

    }
  }
);


// Create User Quote
export const CreateQuote = createAsyncThunk<{
  rejectValue: KnownError,
}, Quotedatatype>(
  "CreateQuote",
  async (QuoteData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState() as { auth: { token: string } };
      const config = {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      };
      
        const response2 = await axios.post(
          `/api/v1/quote/${QuoteData?._id}`,
          QuoteData,
          config
        );
        return response2.data.quote;
    
     
      // console.log(QuoteData)
    } catch (err: any) {
      const message = err.response && err.response.data.message
        ? err.response.data.message
        : err.message
      return rejectWithValue(message);

    }
  }
);

// Deelete User Quote
export const DeleteQuote = createAsyncThunk<{
  rejectValue: KnownError,
}, { _id?: string }>(
  "deleteQuote",
  async (Detailsdata, { rejectWithValue, getState }) => {

    try {
      const { auth } = getState() as { auth: { token: string } };
      // console.log(auth.token)
      // console.log(Quotedata?._id)
      const config = {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      };
      await axios.delete(
        `/api/v1/quote/${Detailsdata}`,
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


// GetQuote Details
export const GetSingleQuoteDetails = createAsyncThunk < BookMarkAQuotePayload,{
  rejectValue: KnownError,
}>(
  "GetDetails",
  async (Detailsdata, { rejectWithValue, getState }) => {

    try {
      const { auth } = getState() as { auth: { QuoteInfo: { _id: String }, token: string } };
    
      const config = {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.get(
        `/api/v1/quote/${Detailsdata}`,
        config
      );
       return {
        Quotedetails: response.data.Quote,
        userIdIncludedInBookmarksArray: response.data.userIdIncludedInBookmarksArray
      };

    } catch (err: any) {
      const message = err.response && err.response.data.message
        ? err.response.data.message
        : err.message
      return rejectWithValue(message);

    }
  }
);

// Get User Quote
export const GetUserQuote = createAsyncThunk<{
  rejectValue: KnownError,
}, {_id?:any}>(
  "GetUserQuote",
  async (Detailsdata, { rejectWithValue, getState }) => {

    try {
      const { auth } = getState() as { auth: { QuoteInfo: { _id: String }, token: string } };

      const config = {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.get(
        `/api/v1/quote/user/${Detailsdata}`,
        config
      );
      return response.data.quote;
      // console.log(Detailsdata)

    } catch (err: any) {
      const message = err.response && err.response.data.message
        ? err.response.data.message
        : err.message
      return rejectWithValue(message);

    }
  }
);