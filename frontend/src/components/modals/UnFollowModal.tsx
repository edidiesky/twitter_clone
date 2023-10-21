import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { slideUp } from "../utils/framer";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxtoolkit";
import { FollowAndUnFollowAUser, GetUserProfile } from "../../features/auth/authReducer";

type modalType = {
  modal?: boolean;
  id?: string;
  name?: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UnFollowModal: React.FC<modalType> = ({ modal, setModal, id, name  }) => {

  const dispatch = useAppDispatch()
  

  React.useEffect(() => {
    if (name) {
      dispatch(GetUserProfile(name))
    }

  }, [name])

  const { userDetails } = useAppSelector(store => store.auth)


  const handleUnFollow = ()=> {
    dispatch(FollowAndUnFollowAUser({ profiledata: id }))
    setModal(false)
  }



  return (
    <UnFollowModalStyles
      as={motion.div}
      initial={{ opacity: 0, visibility: "hidden" }}
      exit={{ opacity: 0, visibility: "hidden" }}
      animate={{ opacity: 1, visibility: "visible" }}
    >
      <div className="backdrop" onClick={() => setModal(false)}></div>

      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        exit={"exit"}
        className={"deleteCard shadow"}
      >
       <div className="center_content h-100 justify-space w-85 py-2 auto flex column gap-1">
          
          <div className="w-85 formwraper auto flex column gap-1">
            <h4 className="fs-24 text-dark text-start text-bold">Unfollow @{userDetails?.name}
            
            <span className="block text-grey fs-15 text-light py-1">
           Their posts will no longer show up in your For You timeline. You can still view their profile, unless their posts are protected.   
           </span>
            </h4>
          
           <div className="flex column gap-1 w-100">
              <div onClick={handleUnFollow} className="btn w-100 auto btn-2 fs-16 text-white text-extra-bold">UnFollow
              </div>
              <div onClick={() => setModal(false)} className="btn w-100 auto btn-1 fs-16 text-white text-extra-bold">Cancel
              </div>
           </div>
          </div>

        </div>
      </motion.div>
    </UnFollowModalStyles>
    // <h2>hello</h2>
  );
}
export default UnFollowModal

const UnFollowModalStyles = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  position: fixed;
    left: 50%;
    transform: translateX(-50%);
  display: flex;
  z-index: 4800;
  align-items: center;
  justify-content: center;
  top: 0;
  .formwraper {
    padding: 2rem 0;
    /* width: 70%; */
  }
  .btn.btn-2 {
    background-color:var(--dark-1);
    padding:1.5rem !important;

    cursor: pointer;
    color: var(--white);
  }

  .btn.btn-1 {
    padding:1rem 1.5rem !important;
    padding:1.5rem !important;

    background-color: transparent !important;
    color: var(--dark-1);
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;

    &:hover {
      background-color: var(--grey-hover) !important;
    }
  }
  .label {
    width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
  font-size: 1.3rem;
  color: var(--dark-1);
  font-weight: 700;
  text-transform: capitalize;
  position: relative;


  span {
    font-size: 1.3rem;
    color: #c61212;
    font-weight: 600;
    display: none;
  }
  }

  .option {
      width: 100%;
      position: relative;
      text-align: center;
      padding: 0 1.4rem;
      font-size: 16px;
      color: var(--grey-1);
      &::after {
        width: 45%;
        height: 0.4px;
        content: "";
        background-color: var(--border);
        left: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      &::before {
        width: 45%;
        height: 0.4px;
        content: "";
        background-color: var(--border);
        right: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  .btn {
    padding: 1rem 2rem !important;
    opacity:1 !important;
  }
  .authBtn {
    border: 1px solid var(--border);
    padding: .9rem 4rem;
    border-radius: 40px;
    width: 100%;
    cursor: pointer;
    &:hover {
      background-color: var(--dark-grey-hover) !important;
    }
  }
  .LoginBottom {
    position: relative;
    padding: 0 1rem;
    /* padding-bottom: 1.6rem; */

    .option {
      width: 100%;
      position: relative;
      text-align: center;
      padding: 0 1.4rem;
      font-size: 14px;
      color: var(--dark-1);
      &::after {
        width: 45%;
        height: 0.4px;
        content: "";
        background-color: rgba(0, 0, 0, 0.5);
        left: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      &::before {
        width: 45%;
        height: 0.4px;
        content: "";
        background-color: rgba(0, 0, 0, 0.5);
        right: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .backdrop {
    background: var(--backdrop);

    position: absolute;
    height: 100%;
    width: 100%;
  }
  .Logintop {
  z-index: 3000;
  position:sticky;
  left:0;
  top:0;  
  top: 0;
  background-color: var(--top);
  z-index: 30;
  backdrop-filter: blur(12px);
  border-top-left-radius:20px;
  border-top-right-radius:20px;
  }
  .deleteCard {
    max-width: 600px;
    width: 360px;
    display: flex;
    flex-direction: column;
    background: var(--white);
    box-shadow:var(--shadow);
    position: relative;
    border-radius:20px;
    border-top-right-radius:20px;
    @media (max-width:980px) {
      width: 70%;
    }
    @media (max-width:580px) {
      width: 90%;
    }

  }
  .deleteCard_wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: var(--white);
    border-radius: 20px;
    position: relative;
  }
  .center_content {
    background: var(--white);
    position: relative;
  }
`;
