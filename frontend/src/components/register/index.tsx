import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { BsTwitter } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { FaFacebook, FaGithub } from "react-icons/fa";
import RegsiterModal from "../modals/RegisterModal";
import LoginModal from "../modals/LoginModal";
import UsernameModal from "../modals/UsernameModal";
import ProfilePictureModal from "../modals/ProfilePicture";
import TwitterBanner from "../../assets/svg/twitterBanner";
import { useAppSelector } from "../../hooks/reduxtoolkit";
import MyAnimatePresence from "../../utils/AnimatePresence";

const Regsiters: React.FC = () => {
  const { registerisLoading, registerisSuccess } = useAppSelector(store => store.auth)

  const [registermodal, setRegisterModal] = useState<boolean>(false)
  const [loginmodal, setLoginModal] = useState<boolean>(false)
  const [username, setUsername] = useState<boolean>(false)
  const [profile, setProfile] = useState<boolean>(false)

  const [tab, setTab] = useState(0)

  // useEffect(()=> {
  //   if (!registerisSuccess) {
  //     setTab(1)
  //   }
  // }, [registerisSuccess, setTab])
  return (
    <RegsiterStyles style={{ overflow: "hidden" }}>
      {/* register modal */}
      <MyAnimatePresence
        initial={false} exitBeforeEnter
      >
        {registermodal && !registerisSuccess && <RegsiterModal setTab={setTab} modal={registermodal}
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

      >
        {tab === 1 && <UsernameModal setTab={setTab} />}
      </MyAnimatePresence>

      {/* profile modal */}
      <MyAnimatePresence

      >
        {tab === 2 && <ProfilePictureModal modal={profile}
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
              <div className="authBtn gap-2 flex fs-16 text-dark item-center">
                <FcGoogle fontSize={"24px"} />{" "}
                <div className="w-100 text-center">Continue with Google</div>{" "}
              </div>

              <div className="authBtn gap-2 flex fs-16 text-dark item-center">
                <FaGithub fontSize={"24px"} />{" "}
                <div className="w-100 text-center">Continue with Github</div>{" "}
              </div>
            </div>
            <div className="option">or</div>
            <div onClick={() => setRegisterModal(true)} className="btn btn-2 fs-16 text-bold text-white">Create account</div>
            <h5 className="fs-12 text-grey text-light">By signing up, you agree to the <span className="text-blue">Terms of Service</span> and <span className="text-blue">Privacy Policy</span>, including Cookie Use.</h5>
          </div>
          <div style={{ marginTop: "3rem" }} className="flex authWrapper column gap-2">
            <h4 className="fs-18 text-extra-bold">Already have an account?</h4>
            <div onClick={() => setLoginModal(true)} className="authBtn w-100 gap-2 flex fs-16 text-dark item-center">
              <div className="w-100 text-center">Sign in</div>{" "}
            </div>
          </div>
        </div>
      </div>
    </RegsiterStyles>
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
    align-items: center;
    justify-content: center;
    gap: 5rem;
    width: 100%;
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
    width: 55%;
    @media (max-width:1080px) {
    width: 95%;

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
    padding: 1rem 4rem;
    border-radius: 40px;
    width: 100%;
    cursor: pointer;
    &:hover {
      background-color: var(--dark-grey-hover) !important;
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