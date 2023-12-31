

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Home from '../components/home';
const HomeIndex: React.FC = () => {
  return (
    <HomeStyles>
      <Home />
    </HomeStyles>
  )
}


const HomeStyles = styled.div`
  width: 100%;
  position: relative;
`

export default HomeIndex