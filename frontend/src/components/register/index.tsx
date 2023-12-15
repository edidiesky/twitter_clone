import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { BsTwitter } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebook, FaGithub } from "react-icons/fa";
import RegsiterModal from "../modals/RegisterModal";
import LoginModal from "../modals/LoginModal";
import UsernameModal from "../modals/UsernameModal";
import ProfilePictureModal from "../modals/ProfilePicture";
import TwitterBanner from "../../assets/svg/twitterBanner";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxtoolkit";
import MyAnimatePresence from "../../utils/AnimatePresence";
import { useGoogleLogin } from '@react-oauth/google'
import axios from "axios";
import { GoogleOauth, getGithubAccesToken, getGithubUserProfile } from "../../features/auth/authReducer";
import LoaderIndex from "../loaders";
import Message from "../loaders/Message";
import { clearUserProfile } from "../../features/auth/authSlice";
import { twitterList } from '../../data';
const Regsiters: React.FC = () => {

  const [registermodal, setRegisterModal] = useState<boolean>(false)
  const [loginmodal, setLoginModal] = useState<boolean>(false)
  const [username, setUsername] = useState<boolean>(false)
  const [profile, setProfile] = useState<boolean>(false)

  const [githubaccesstoken, setGithubAccessToken] = useState('access_token=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&scope=&token_type=bearer')

  const [tab, setTab] = useState(0)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    googleOauthisLoading,
    googleOauthisSuccess,
    googleOauthisError,
    alertText,
    showAlert,
    alertType,
    userInfo,
    modaltab
  } = useAppSelector(store => store.auth)

  // GOGGLE LOGIN

  const googleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      // console.log(tokenResponse);
      const userInfo = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res: any) => res.data);
      const { email, family_name, given_name, name, picture } = userInfo
      dispatch(GoogleOauth({ email, family_name, given_name, name, picture }))
    },
    // flow: 'implicit', // implicit is the default
  });

  useEffect(() => {

    if (googleOauthisSuccess) {
      const interval = setTimeout(() => {
        navigate('/')
      }, 6000);

      return () => clearTimeout(interval)

    }
  }, [googleOauthisSuccess, setTab])

  // console.log(githubaccesstoken?.split('&')[0].split('=')[1].toString())

  // GITHUB LOGIN

  const HandleGithubLogin = () => {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`)
  }

  let [searchParams, setSearchParams] = useSearchParams();
  const queryvalue: string = searchParams.get("code") as string;

  // useEffect(() => {
  //   if (queryvalue && localStorage.getItem('accessToken') === null) {
  //     dispatch(getGithubAccesToken({ githubcode: queryvalue }))
  //   }
  // }, [])

  // const accessToken = localStorage.getItem("accessToken");
  // useEffect(() => {
  //   if (accessToken) {
  //     dispatch(getGithubUserProfile({ githubcode: accessToken }))
  //   }
  // }, [accessToken])


  return (
    <div className="w-100 flex column gap-2">
      <RegsiterStyles style={{ overflow: "hidden" }}>

        {
          googleOauthisLoading && <LoaderIndex />
        }
        {/* register modal */}
        <MyAnimatePresence
          initial={false} exitBeforeEnter
        >
          {registermodal && <RegsiterModal setTab={setTab} modal={registermodal}
            setModal={setRegisterModal} />}
        </MyAnimatePresence>
        {/* login modal */}
        <MyAnimatePresence

        >
          {loginmodal && <LoginModal modal={loginmodal}
            setModal={setLoginModal} />}
        </MyAnimatePresence>
        {/* username modal */}
        <MyAnimatePresence
          initial={false} exitBeforeEnter
        >
          {modaltab === 1 && <UsernameModal setTab={setTab} />}
        </MyAnimatePresence>

        {/* profile modal */}
        <MyAnimatePresence
          initial={false} exitBeforeEnter
        >
          {modaltab === 2 && <ProfilePictureModal modal={profile}
            setModal={setProfile} />}
        </MyAnimatePresence>


        <div className="w-100 authleft flex item-center justify-center">
          <TwitterBanner />
        </div>
        <div className="w-100 auth_right flex item-center justify-center h-100 gap-2 flex column ">
          <div className="w-85 auto auth_right_content h-100 flex item-start justify-center gap-2 column">
            <div className="flex column gap-1">


              <div className="text-dark register_text text-heavy">Happening now</div>
              <h3 className="fs-35 py-1 text-extra-bold">Join today.</h3>
            </div>
            <div className="flex authWrapper column w-100 gap-1">
              <div className="flex w-100 column gap-1 item-start">
                <div className="w-100">
                  <Message showAlert={showAlert} alertText={alertText} alertType={alertType} />
                </div>
                <div onClick={() => googleLogin()} className="authBtn gap-2 flex fs-15 text-bold text-dark item-center">
                  <FcGoogle fontSize={"24px"} />{" "}
                  <div className="w-100 text-center">Continue with Google</div>{" "}
                </div>

                {/* <div onClick={HandleGithubLogin} className="authBtn gap-2 flex fs-15 text-bold text-dark item-center">
                  <FaGithub fontSize={"24px"} />{" "}
                  <div className="w-100 text-center">Continue with Github</div>{" "}
                </div> */}
              </div>
              {/* <div className="option">or</div> */}
              <div style={{marginTop:"2rem"}} onClick={() => setRegisterModal(true)} className="btn btn-2 fs-16 text-bold text-white">Create account</div>
              <h5 style={{lineHeight:"1.5"}} className="fs-12 text-grey text-light">By signing up, you agree to the <span className="text-blue">Terms of Service</span> and <span className="text-blue">Privacy Policy</span>, including Cookie Use.</h5>
            </div>
            <div style={{ marginTop: "3rem" }} className="flex authWrapper column gap-2">
              <h4 className="fs-18 text-extra-bold">Already have an account?</h4>
              <div onClick={() => setLoginModal(true)} className="authBtn btn_signin w-100 gap-2 flex fs-15 text-dark item-center">
                <div className="w-100 text-center text-bold">Sign in</div>{" "}
              </div>
            </div>
          </div>
        </div>
      </RegsiterStyles>
      <div className="w-100 py-1 flex item-center justify-center">
        <div style={{flexWrap:"wrap"}} className="w-90 auto flex item-center justify-center">
          {
            twitterList.map((x?:any)=> {
              return <div style={{margin:"4px 10px", fontSize:"13px"}} className="text-light text-grey">{x}</div>
            })
          }
        </div>
      </div>
    </div>
  )
}

const RegsiterStyles = styled.div`
  width: 100%;
  display:grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  @media (max-width:980px) {
    display: flex;
    /* flex-direction: column-reverse; */
    align-items: center;
    justify-content: center;
    gap: 5rem;
  }
  .auth_right_content {
     @media (max-width:780px) {
    display: flex;
    /* flex-direction: column-reverse; */
    align-items: flex-start;
    justify-content: center;
    gap: 5rem;
    width: 90%;
  }
  }
  .auth_right {
    justify-content: space-around;
    padding: 2rem 0;
  }
  h3 {
    @media (max-width:480px) {
    font-size: 30px;
    }
  }
  
  .register_text {
    font-size: 64px;
    font-weight: bold;
  /* font-family: "Twitter_Minor", sans-serif; */
    @media (max-width:1080px) {
    font-size: 50px;
  }
  }
  .authWrapper {
    width: 300px;
    @media (max-width:1080px) {
    width: 55%;

    }

     @media (max-width:680px) {
    width: 60%;

    }
  }
  .btn {
    padding: 1.2rem 2rem !important;
    opacity:1 !important;
  }
  .authleft {
    @media (max-width:780px) {
      display: none;
    }
  }
  .authBtn {
    border: 1px solid var(--border1);
    padding: .7rem 4rem;
    border-radius: 40px;
    width: 100%;
    cursor: pointer;
    @media (max-width:780px) {

    }
    &.btn_signin {
    padding: 10px 40px;
      color:var(--blue-1);
    }
    &:hover {
      background-color: var(--grey-4) !important;
    }
  }
  .option {
      width: 100%;
      position: relative;
      text-align: center;
      padding: 0 1.4rem;
      font-size: 14px;
      color: var(--grey-1);
      &::after {
        width: 45%;
        height: 0.4px;
        content: "";
        background-color: rgba(0, 0, 0, 0.08);
        left: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      &::before {
        width: 45%;
        height: 0.4px;
        content: "";
        background-color: rgba(0, 0, 0, 0.08);
        right: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
`

export default Regsiters