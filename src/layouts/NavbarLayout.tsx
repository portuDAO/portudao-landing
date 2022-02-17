import type { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import MainNavbar from 'components/MainNavbar';

interface NavbarLayoutProps {
  children?: ReactNode;
}
const Container = styled.div`
  height: 100%;
  background-repeat: no-repeat;
  background-position: left bottom;
`;

const NavbarLayout: FC<NavbarLayoutProps> = ({ children }) => {
  return (
    <Container>
      <MainNavbar />
      {children || <Outlet />}
    </Container>
  );
};

export default NavbarLayout;
