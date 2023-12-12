import React from 'react';
import styled from 'styled-components';
import Top from '../top/top';
import Feed from '../../common/feed/feed';
import TweetFormSection from '../../common/tweetsection';
import Notification from '../../common/notification';
import { useAppDispatch } from '../../../hooks/reduxtoolkit';
import { cleartweet, clearTweetId } from '../../../features/tweet/tweetSlice';
import { GetAllUserProfile } from '../../../features/auth/authReducer';
import { getAllTweet } from '../../../features/tweet/tweetReducer';

const Content: React.FC = () => {

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(clearTweetId("any"))
        dispatch(cleartweet({ payload: "any" }))
        dispatch(GetAllUserProfile())
        dispatch(getAllTweet())
    }, [])

    return (
        <ContentStyles>
            <Top />
            {/* notification popup */}
            {/* <Notification/> */}
            <div className="forms w-100">
                <TweetFormSection placeholder='What is happening?!' type='Home' />
            </div>
            <Feed />
        </ContentStyles>
    )
}

const ContentStyles = styled.div`
        flex:1;
        border-right : 1px solid var(--border);
        border-left : 1px solid var(--border);

        min-height: 100vh;
        /* background-color: red; */
        @media (max-width:980px) {
    border-right : 1px solid var(--border);
        }
        .forms {
            @media (max-width:490px) {
                display:none;
            }
        }
    
  `

export default Content