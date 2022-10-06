import AccountsPage from "./pages/AccountsPage";
import Navbar from "./components/Navbar";
import Container from "@mui/material/Container";
import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserInterfaceContext } from "./contexts/UserInterfaceContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import * as authService from "./services/auth";
import StudentHomePage from "./pages/StudentHomePage";

function App() {
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);
    navigate("/login");
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      localStorage.setItem("accessToken", response.data.access_token);
      setAccessToken(response.data.access_token);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const { isDarkMode, snackbarConfig, onCloseSnackbar } =
    useContext(UserInterfaceContext);
  const theme = createTheme({
    palette: {
      // primary: { main: "#ffc20f" },
      primary: { main: "#ffc400" },
      mode: isDarkMode ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar onLogout={handleLogout} />
      <Container sx={{ marginTop: 3 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/home"
            element={
              accessToken ? <StudentHomePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/account/all"
            element={accessToken ? <AccountsPage /> : <Navigate to="/login" />}
          />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route
            path="/login"
            element={
              accessToken ? (
                <Navigate to="/" />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
