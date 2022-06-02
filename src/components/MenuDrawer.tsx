import { useState } from "react"
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material"
import { AiOutlineMenu } from "react-icons/ai"
import { useNavigate } from "react-router"
import useAuth from "hooks/useAuth"

interface Props {
  setOpenConnect: any
}

// @ts-ignore
export default function MenuDrawer({ setOpenConnect }: Props): JSX.Element {
  const [openDrawer, setOpenDrawer] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()

  const goToLanding = () => navigate("/")
  const goToEvents = () => navigate("/events")
  const goToGallery = () => navigate("/gallery")

  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <ListItem
            onClick={() => {
              goToLanding()
              setOpenDrawer(false)
            }}
          >
            <ListItemText>
              <Typography variant="h6">Home</Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              goToEvents()
              setOpenDrawer(false)
            }}
          >
            <ListItemText>
              <Typography variant="h6">Events</Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              goToGallery()
              setOpenDrawer(false)
            }}
          >
            <ListItemText>
              <Typography variant="h6">Gallery</Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenConnect(true)
              setOpenDrawer(false)
            }}
          >
            <ListItemText>
              <Typography variant="h6">Connect Wallet</Typography>
            </ListItemText>
          </ListItem>
          {isAuthenticated && (
            <ListItem
              onClick={() => {
                logout()
                setOpenDrawer(false)
              }}
            >
              <ListItemText>
                <Typography variant="h6">Logout</Typography>
              </ListItemText>
            </ListItem>
          )}
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <AiOutlineMenu />
      </IconButton>
    </>
  )
}
