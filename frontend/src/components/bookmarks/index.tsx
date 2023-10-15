import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import RightSidebarIndex from '../common/right/RightBar';
import LeftSidebarIndex from '../common/LeftSidebar';
import Top from './top/top';
import AuthModal from '../modals/EditProfileModal';
import { AnimatePresence } from 'framer-motion';
import { getAllBookmarkedTweet } from '../../features/tweet/tweetReducer';
import { feedcardtype } from '../../types/feedtype';
import FeedCard from '../common/FeedCard';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxtoolkit';

const Bookmarks: React.FC = () => {
    const [tab, setTab] = useState(0)
    const feed = false
    // console.log(name)
    const [modal, setModal] = React.useState<Boolean>(false)

    const { userInfo, userprofileisSuccess } = useAppSelector(store => store.auth)
    const { bookmarks, tweetisLoading } = useAppSelector(store => store.tweet)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllBookmarkedTweet())
    }, [])
    return (
        <ProfileStyles>
            {/* top bar of user profile */}
            <LeftSidebarIndex />
            <div className="flex-1 flex wrapper item-center">
                <div className="flex flex-1 wraps column ">
                    <Top />

                    <div className="w-100 flex py-2 column">

                        {
                            bookmarks?.length === 0 ? <div className="flex w-85 auto py-2 item-center justify-center">
                                <h2 style={{ lineHeight: "1.3", width: "60%" }} className="fs-24 w-85 auto text-extra-bold">
                                    @{userInfo?.display_name} <br /> you have no bookmarks

                                    <span className="text-light fs-14 block text-grey">When they do, their posts will show up here.</span>
                                </h2>
                            </div> : <div className="w-100">
                                {
                                    tweetisLoading ? <div className="flex py-2 w-100 justify-center">
                                        <CircularProgress style={{ width: '30px', height: '30px', fontSize: '30px' }} color="primary" />
                                    </div> : <>
                                        {
                                            bookmarks?.map((value: feedcardtype) => {
                                                return <FeedCard {...value} key={value._id} />
                                            })
                                        }
                                    </>
                                }
                            </div>
                        }

                    </div>
                </div>
                <RightSidebarIndex />
            </div>
            {/* User feeds */}
        </ProfileStyles>
    )
}

const ProfileStyles = styled.div`
    width: 100%;
    display:flex;
    gap:1rem;
    height: 100vh;
    overflow: auto;
    align-items: flex-start;
    border-right: 1px solid var(--border);
    border-left: 1px solid var(--border);

    @media (min-width:1380px) {
        max-width: 1380px;
        margin: 0 auto;
    }
     .tag {
        cursor: pointer;
            width: max-content;
            margin: 0 auto;
            /* background-color: red; */
            position: relative;
            &.active {
            position: relative;
             &::after {
                position: absolute;
                width: 100%;
                content: '';
                left: 0;
                background-color: var(--blue-1);
                height: 4px;
                border-radius: 10px;
                bottom: -100%;
            }
            }
           
        }
    .profilelist {
        border-bottom:1px solid var(--border);
        .profileTag {
            padding:1.7rem 2rem;
            text-align:center;
            
            &:hover {
                background:var(--grey-2);
            }
        }
    }
    .wrapper {
        height: 100vh;
    } 
    .wraps {
        border-right : 1px solid var(--border);
        height: 100vh;
        border-left : 1px solid var(--border);
      
        @media (max-width:980px) {
    border-right : 1px solid var(--border);

        }
    }

  `

export default Bookmarks