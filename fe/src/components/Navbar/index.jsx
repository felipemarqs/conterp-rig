import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  Menu,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import {
  Search,
  Message,
  DarkModeOutlined,
  LightModeOutlined,
  Notifications,
  Help,
  Close,
  ArrowDropDownOutlined,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogOut } from "../../state/index";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../FlexBetween";
import logo_dark from "../../assets/images/logo_dark.png";
import { useAuth } from "../../hooks/useAuth";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { isUserAdm } = useAuth();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();

  const user = userState ? userState : {};

  const handleChangeMode = () => {
    dispatch(setMode());
  };

  const handleLogOut = () => {
    dispatch(setLogOut());
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: theme.palette.primary[400],
        boxShadow: "none",
      }}
    >
      <FlexBetween>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* LEFT SIDE */}
          <FlexBetween>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
          </FlexBetween>
        </Toolbar>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem" padding="1rem">
          <IconButton onClick={handleChangeMode}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                textAlign="left"
                background={theme.palette.primary[500]}
                width="100%"
                height="100%"
              >
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.rig_name ? user.rig_name : "Diretor"}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
    </AppBar>
  );
};

export default Navbar;
