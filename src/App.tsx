import "App.css"
import { useRoutes } from "react-router-dom"
import { ThemeProvider } from "@mui/material"
import materialUITheme from "theme/materialUITheme"
import routes from "routes"
import { SnackbarProvider } from "notistack"
import { AuthProvider } from "contexts/AuthContext"

function App(): JSX.Element {
  const content = useRoutes(routes)

  return (
    <AuthProvider>
      <ThemeProvider theme={materialUITheme}>
        <SnackbarProvider maxSnack={3}>{content}</SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
