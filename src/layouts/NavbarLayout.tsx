import type { FC, ReactNode } from "react"
import styled from "styled-components"
import { Outlet } from "react-router-dom"
import MainNavbar from "components/MainNavbar"
import Background from "icons/portudao_background.png"

interface NavbarLayoutProps {
  children?: ReactNode
}

const NavbarLayoutRoot = styled.div`
  height: 100%;
`

const Container = styled.div`
  height: 100%;
  background-size: cover;
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-position: left bottom;
`

const NavbarLayout: FC<NavbarLayoutProps> = ({ children }) => {
  return (
    <Container>
      <NavbarLayoutRoot>
        <MainNavbar />
        {children || <Outlet />}
      </NavbarLayoutRoot>
    </Container>
  )
}

export default NavbarLayout
