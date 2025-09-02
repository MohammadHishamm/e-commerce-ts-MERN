/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AlignHorizontalCenterOutlinedIcon from "@mui/icons-material/AlignHorizontalCenterOutlined";
import { ShoppingCart } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { useAuth } from "../context/auth/auth";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Fingerprint from "@mui/icons-material/Fingerprint";
import ShinyText from "./ShinyText";

function Navbar() {
  const { username, isAuth, logout } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();

  const navigateLoginPage = () => {
    navigate("/login");
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    handleCloseUserMenu();
  };

  const navigatetocart = () => {
    navigate("/cart");
  };

  console.log("From navbar", { username, isAuth });

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "rgba(56, 54, 54, 0.2)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container maxWidth="xl" sx={{ backgroundColor: "transparent" }}>
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <AlignHorizontalCenterOutlinedIcon
                sx={{ display: "flex", mr: 1, color: "white" }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <ShinyText
                  text="Fate"
                  disabled={false}
                  speed={3}
                  className="custom-class"
                />
              </Typography>

              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <ShinyText
                  text="Fate"
                  disabled={false}
                  speed={3}
                  className="custom-class"
                />
              </Typography>
            </Box>

            <Box
              gap={4}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <IconButton aria-label="cart">
                <Badge badgeContent={4} color="secondary">
                  <ShoppingCart
                    sx={{ color: "white" }}
                    onClick={navigatetocart}
                  />
                </Badge>
              </IconButton>
              {isAuth ? (
                <>
                  <Tooltip title="Open settings">
                    <>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Typography sx={{ color: "white", padding: "10px" }}>
                          {username || " "}
                        </Typography>
                        <Avatar alt={username || " "} src="" />
                      </IconButton>
                    </>
                  </Tooltip>
                  <Menu
                    sx={{
                      mt: "45px",
                      "& .MuiPaper-root": {
                        backgroundColor: "rgba(56, 54, 54, 0.9)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "white",
                      },
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography
                          sx={{ textAlign: "center", color: "white" }}
                        >
                          Orders
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <Typography
                          sx={{ textAlign: "center", color: "white" }}
                        >
                          Logout
                        </Typography>
                      </MenuItem>
                    </>
                  </Menu>
                </>
              ) : (
                <Button
                  onClick={navigateLoginPage}
                  sx={{
                    borderRadius: "50px", // pill shape
                    backgroundColor: "#2e0808ff", // dark background
                    px: 3, // horizontal padding
                    py: 1.2, // vertical padding
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    "&:hover": {
                      backgroundColor: "#222", // slightly lighter on hover
                    },
                  }}
                >
                  <ShinyText
                    text="Login"
                    disabled={false}
                    speed={3}
                    className="custom-class"
                  />
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
