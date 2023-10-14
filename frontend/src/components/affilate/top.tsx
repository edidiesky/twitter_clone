import React from 'react';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxtoolkit';
import { useParams } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom';
import LoaderIndex from '../loaders';
import { GetUserProfile } from '../../features/auth/authReducer';
type SetStateProp<T> = React.Dispatch<React.SetStateAction<T>>
type modalType = {
    setModal?: SetStateProp<Boolean>;
}

const Top: React.FC<modalType> = ({ setModal }) => {
    const { userDetails } = useAppSelector(store => store.auth)
    const [tab, setTab] = React.useState(0)
    const dispatch = useAppDispatch()
    const { name } = useParams()
    const { followings } = useAppSelector(store => store.auth)
    React.useEffect(() => {
        //  dispatch(get)
        if (name) {
            dispatch(GetUserProfile(name))
        }
    }, [name])

    const { tweets, tweetisLoading } = useAppSelector(store => store.tweet)



    return (
        <TopStyles className="w-100 flex column gap-1">

            <div className='flex item-center gap-2 w-90 auto'>
                {/* <h2 className="fs-30">Top bar</h2> */}
                <Link to={'/'} className="icons flex item-center justify-center"><AiOutlineArrowLeft color='var(--dark-1)' fontSize={'20px'} /></Link>
                <h3 className="fs-20 text-extra-bold text-dark">{userDetails?.name}

                    <span style={{ marginTop: "1px" }} className="flex item-center gap-1 fs-12 text-light text-grey">
                        @{userDetails?.email}</span>
                </h3>
            </div>
            <ul className="w-100 flex item-center text-bold fs-16 profilelist">
                <li className="flex-1 profileTag w-100">
                    <NavLink className={isActive =>
                        "nav-link tag text-dark" + (!isActive ? " unselected" : "")
                    } to={`/`} >Verified Followers</NavLink>
                </li>
                <li className="flex-1 profileTag w-100">
                    <NavLink to={`/${userDetails?.name}/followers`} className={isActive =>
                        "nav-link tag text-dark" + (!isActive ? " unselected" : "")
                    } >Followers</NavLink>
                </li>
                <li className="flex-1 profileTag w-100">
                    <NavLink to={'following'} className={isActive =>
                        "nav-link tag text-dark" + (!isActive ? " unselected" : "")
                    } >Followings</NavLink>
                </li>

            </ul>

        </TopStyles>
    )
}

const TopStyles = styled.div`
    width: 100%;
    color: #fff;
  position: sticky;
  top: 0;
  background-color: var(--top1);
  z-index: 300;
  /* padding: 1rem 0; */
  backdrop-filter: blur(12px);
  padding:1rem 0;
   .tag {
        cursor: pointer;
            width: max-content;
            margin: 0 auto;
            /* background-color: red; */
  font-family: "CustomFont_Normal", sans-serif;
  font-weight: normal;
            position: relative;
            &.active {
            position: relative;
            font-weight: 700;
            font-family: "CustomFont_Bold", sans-serif;
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
            padding: 2rem;
            text-align:center;
            /* &.active {
                background:var(--grey-hover);
            } */
            &:hover {
                background:var(--grey-hover);
            }
        }
    }
  /* backdrop-filter: c; */
  `

export default Top