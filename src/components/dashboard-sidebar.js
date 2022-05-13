import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useUser from "src/hooks/store/useUser";
import { Bookmark as BookmarkIcon } from "../icons/bookmark";
import { Map as MapIcon } from "../icons/map";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { Users as UsersIcon } from "../icons/users";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";

const logout = () => {
  sessionStorage.clear();
  window.location.replace("/login");
};

const merchantItems = [
  {
    href: "/map",
    icon: <MapIcon fontSize="small" />,
    title: "Map",
  },
  {
    href: "/customer",
    icon: <UsersIcon fontSize="small" />,
    title: "Customer",
  },
  {
    href: "/mall",
    icon: <ShoppingBagIcon fontSize="small" />,
    title: "Mall",
  },
  {
    href: "",
    icon: <LogoutIcon fontSize="small" />,
    title: "Logout",
    onClick: () => logout(),
  },
];

const userItems = [
  {
    href: "/map",
    icon: <MapIcon fontSize="small" />,
    title: "Map",
  },
  {
    href: "/bookmark",
    icon: <BookmarkIcon fontSize="small" />,
    title: "Bookmark",
  },
  {
    href: "",
    icon: <LogoutIcon fontSize="small" />,
    title: "Logout",
    onClick: () => logout(),
  },
];

const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const [items, setItems] = useState([]);
  const { user } = useUser();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  }, [router.asPath]);

  useEffect(() => {
    if (user.role) {
      user.role === "MERCHANT" ? setItems(merchantItems) : setItems(userItems);
    }
  }, []);

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  Support App
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  Description
                </Typography>
              </div>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
              onClick={item.onClick}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default DashboardSidebar;
