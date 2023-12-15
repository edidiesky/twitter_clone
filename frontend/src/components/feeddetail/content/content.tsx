import React, { useState } from 'react';
import styled from 'styled-components';
import Top from '../feedtop/top';
import PostDetailsComments from './comments';
import TweetFormSection from '../../common/tweetsection';
import PostFeedCard from '../card';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxtoolkit';
import { BookMarkATweet, GetSingleTweetDetails } from '../../../features/tweet/tweetReducer';
import { Link, useParams } from 'react-router-dom';
import MessageIcon from '../../../assets/svg/feedcardicons/message';
import RetweetIcon from '../../../assets/svg/feedcardicons/retweet';
import LikeIcon from '../../../assets/svg/feedcardicons/like';
import StatIcon from '../../../assets/svg/feedcardicons/stat';
import BookmarkIcon from '../../../assets/svg/feedcardicons/bookmark';
import { GetSingleQuoteTweetDetails } from '../../../features/quote/quoteReducer';
import LoaderIndex from '../../loaders';


const PostDetailsContent: React.FC = () => {
    const {id} = useParams()
    const { commentisLoading, commentisSuccess } = useAppSelector(store => store.comment)
    const [bookmark, setBookMark] = useState<boolean>(false)
    const { tweets, tweetDetails, isBookMarked } = useAppSelector(store => store.tweet)
    const { quotes } = useAppSelector(store => store.quotes)
    // console.log(isBookMarked)
    
    const dispatch = useAppDispatch()
    React.useEffect(()=> {
        dispatch(GetSingleTweetDetails({Detailsdata:id}))
    }, [id, commentisSuccess])
    React.useEffect(() => {
        dispatch(GetSingleQuoteTweetDetails({Detailsdata:id}))
    }, [id])
    const handleBookMark=()=> {
        setBookMark(!bookmark)
        dispatch(BookMarkATweet({Detailsdata:id}))
    }
   
    return (
        <PostDetailsContentStyles>
            {
                commentisLoading && <LoaderIndex />
            }
            <Top />
            {/* post feed card */}
            {
                tweetDetails && <PostFeedCard />
            }
            
            {/* data likes reviews comments */}
            {
                tweetDetails && <div className="flex-100 column gap-1 fs-15 text-light text-grey text-light">
                    <div className="flex bottom fs-15 w-90 auto item-center gap-1">
                        <span>7:24 AM · Jul 21, 2023</span>
                        <span className="fs-14 text-grey text-light">·
                            <span className="fs-14 text-bold text-dark">5,133</span>
                            {" "}
                            Views
                        </span>
                    </div>
                    <div style={{ borderBottom: "1px solid rgba(0,0,0,.1)" }} className="flex w-90 auto item-center gap-2 flex-wrap">
                        <span className="fs-14 list text-grey text-light">
                            <span className="fs-14 text-bold text-dark">50</span>
                            {" "}
                            Retweets
                        </span> <Link to={`/i/quote/${tweetDetails?._id}`} className="fs-14 list text-grey text-light">
                            <span className="fs-14 text-bold text-dark">{quotes?.length}</span>
                            {" "}
                            Quotes
                        </Link> <span className="fs-14 list text-grey text-light">
                            <span className="fs-14 text-bold text-dark">
                                {tweetDetails?.tweet_likes?.length}
                            </span>
                            {" "}
                            Likes
                        </span>
                        <span className="fs-14 list text-grey text-light">
                            <span className="fs-14 text-bold text-dark">
                                {tweetDetails?.tweet_bookmarks?.length}
                            </span>
                            {" "}
                            Bookmarks
                        </span>
                    </div>
                    <div className="flex w-90 auto justify-space bottom bottom1 item-center w-90 gap-2">
                        <div className="flex w-100 auto item-center fs-14 text-light feedtags_wrapper text-dark">
                            <div className="flex iconwrapper flex-1 item-center" style={{ gap: ".3rem" }}>
                                <div className="icons icon1 flex item-center justify-center">
                                    <MessageIcon type='large' />
                                </div>
                                23
                            </div>
                            <div className="flex iconwrapper flex-1 justify-center text_2 item-center" style={{ gap: ".3rem" }}>
                                <div className="icons icon2 flex item-center justify-center">
                                    <RetweetIcon type='large' />
                                </div>
                                144
                            </div><div className="flex iconwrapper flex-1 justify-center text-3 item-center" style={{ gap: ".3rem" }}>
                                <div className="icons icon3 flex item-center justify-center">
                                    <LikeIcon type='large' />
                                </div>
                                {tweetDetails?.tweet_likes?.length}
                            </div>
                            <div className="flex iconwrapper flex-1 justify-center item-center" style={{ gap: ".3rem" }}>
                                <div onClick={handleBookMark} className="icons icon1 flex item-center justify-center">
                                    <BookmarkIcon isClicked={isBookMarked} type='large' />
                                </div>
                                {tweetDetails?.tweet_bookmarks?.length}
                            </div>

                        </div>
                        {/* <div className="flex iconwrapper item-center fs-16 text-light" style={{ gap: ".3rem" }}>
                        <div className="icons icon1 flex item-center justify-center">
                            <HiOutlineChatBubbleOvalLeft fontSize={'20px'} />
                        </div>
                        23
                    </div> */}
                    </div>

                </div>
            }
            {
                tweetDetails && <TweetFormSection placeholder='Post your reply' type='details' />
            }
            
            
            <PostDetailsComments />
        </PostDetailsContentStyles>
    )
}

const PostDetailsContentStyles = styled.div`
        flex: 1;
        border-right : 1px solid var(--border);
        border-left : 1px solid var(--border);
        min-height: 100vh;
        .list {
        transition: all .5s;
        cursor: pointer;
            padding:15px 6px;
            &:hover {
                background-color: rgba(0,0,0,.08);
            }

        }
        .bottom {
            padding:17px 0;
            border-bottom : 1px solid var(--border);
            &.bottom1 {
                padding: 10px 0;
            }
        }
        .fs-15 {
            font-size: 1.5rem;
        }
        .iconwrapper {
        transition: all .5s;
            font-size: 14px;
        cursor: pointer;
        @media (max-width:380px) {
            font-size: 13px;
        }
        &:hover {
            color:rgba(29, 156, 240, 0.835) ;
            &.text_2 {

                color:rgba(0, 186, 124, 0.802) ;

            }
            .icons.icon1 {
                background-color: rgba(29,155,240,.1);
                svg {
                    color:rgba(29, 156, 240, 0.835) ;
                }
            }.icons.icon2 {
                background-color: rgba(0,186,124,.1);
                svg {
                    color:rgba(0, 186, 124, 0.802) ;
                }
            }
        }
       .icons {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        transition: all .5s;

        svg {
            font-size: 25px;
        }
    }
}

  `

export default PostDetailsContent