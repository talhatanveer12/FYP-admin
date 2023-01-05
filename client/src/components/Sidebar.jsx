import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    type: "all",
  },
  {
    text: "Client Facing",
    icon: null,
    type: "all",
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
    type: "all",
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
    type: "admin",
  },
  // {
  //   text: "Transactions",
  //   icon: <ReceiptLongOutlined />,
  //   type: "admin",
  // },
  {
    text: "Ledger",
    icon: <ReceiptLongOutlined />,
    type: "accountant",
  },
  {
    text: "Invoice",
    icon: <ReceiptLongOutlined />,
    type: "accountant",
  },
  // {
  //   text: "Geography",
  //   icon: <PublicOutlined />,
  // },
  {
    text: "Sales",
    icon: null,
    type: "sale_manager",
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
    type: "sale_manager",
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
    type: "sale_manager",
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
    type: "sale_manager",
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
    type: "sale_manager",
  },
  {
    text: "Management",
    icon: null,
    type: "admin",
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
    type: "admin",
  },
  // {
  //   text: "Performance",
  //   icon: <TrendingUpOutlined />,
  //   type: "admin",
  // },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  const role = useSelector((state) => state.Auth);

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    EASIFY
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, type }) => {
                if (!icon) {
                  return (
                    <>
                      {(type === role?.user?.role || type === "all") && (
                        <Typography
                          key={text}
                          sx={{ m: "2.25rem 0 1rem 3rem" }}
                        >
                          {text}
                        </Typography>
                      )}
                    </>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <>
                    {(type === role?.user?.role || type === "all") && (
                      <ListItem key={text} disablePadding>
                        <ListItemButton
                          onClick={() => {
                            navigate(`/${lcText}`);
                            setActive(lcText);
                          }}
                          sx={{
                            backgroundColor:
                              active === lcText
                                ? theme.palette.secondary[300]
                                : "transparent",
                            color:
                              active === lcText
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[100],
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              ml: "2rem",
                              color:
                                active === lcText
                                  ? theme.palette.primary[600]
                                  : theme.palette.secondary[200],
                            }}
                          >
                            {icon}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                          {active === lcText && (
                            <ChevronRightOutlined sx={{ ml: "auto" }} />
                          )}
                        </ListItemButton>
                      </ListItem>
                    )}
                  </>
                );
              })}
            </List>
          </Box>

          {/* <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box> */}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
