import {ChakraProvider} from "@chakra-ui/react";
import GlobalStyles from 'utilis/globalStyles';
import styled from "styled-components";
import {HashRouter, Route, Routes} from "react-router-dom";

import {Register, Login} from "components/auth";
import {Notes} from "components/notes/views/Notes";
import {PrivateRoute} from "hoc/PrivateRoute";

const  StyledWrapper = styled.div`
  height:100vh;
`;

function App() {
  return (
      <ChakraProvider>
          <GlobalStyles />
          <StyledWrapper>
              <HashRouter>
                  <Routes>
                      <Route path='/' element={<PrivateRoute children={<Notes/>}/>}/>
                      
                      <Route path='/login' element={<Login/>} />
                      <Route path='/register' element={<Register/>} />
                  </Routes>
              </HashRouter>
          </StyledWrapper>
      </ChakraProvider>
  );
}

export default App;
