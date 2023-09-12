import FeedCard from '../FeedCard';
import { feedcardtype } from '../../../types/feedtype';
import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxtoolkit';
import { CircularProgress } from '@mui/material';
import { getAllTweet } from '../../../features/tweet/tweetReducer';
import { cleartweet } from '../../../features/tweet/tweetSlice';
import { GetAllUserProfile } from '../../../features/auth/authReducer';

const Feed: React.FC = () => {
    const { tweets, tweetisLoading, tweetDetails } = useAppSelector(store => store.tweet)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(cleartweet({payload:"any"}))
        dispatch(GetAllUserProfile())
        dispatch(getAllTweet())
    }, [])

    return (
        <div className="w-100 h-100">
            <FeedStyles>
                <div className="flex w-100 column">
                    {
                        tweetisLoading ? <div className="flex py-2 w-100 justify-center">
                            <CircularProgress style={{ width: '25px', height: '25px', fontSize: '25px' }} color="primary" />
                        </div> : <>
                            {
                                    tweets?.map((value: feedcardtype) => {
                                    return <FeedCard {...value} key={value?._id} />
                                })
                            }
                        </>
                    }

                </div>
            </FeedStyles>

        </div>
    )
}

const FeedStyles = styled.div`
    width: 100%;

  `

export default Feed