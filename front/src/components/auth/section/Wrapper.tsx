import styled from "styled-components";
import {ReactNode} from "react";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
  row-gap: 2rem;
  background:
          url("https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80")
          center center no-repeat;
  background-size: cover;

`;

export const Wrapper = ({children}: { children: ReactNode }) => <StyledWrapper>{children}</StyledWrapper>

