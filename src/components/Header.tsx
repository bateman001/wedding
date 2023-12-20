import { Link, useLocation, useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { GiCastle } from "react-icons/gi";
import { colors } from "../utils/colors";
import { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";

interface NavInfo {
    name: "RSVP" | "Registry" | "Travel" | "Dress Code" | "Home";
    link: "rsvp?step=1" | "https://www.zola.com/registry/brentandmichaela2024" | "travel" | "dress-code" | "";
    pathName: "rsvp" | "registry" | "travel" | "dress-code" | "";
}

export const Header = () => {
    const navigation: NavInfo[] = [
        {
            name: "Home",
            link: "",
            pathName: ""
        },
        {
            name: "Travel",
            link: "travel",
            pathName: "travel"
        },
        {
            name: "RSVP",
            link: "rsvp?step=1",
            pathName: "rsvp"
        },
        {
            name: "Registry",
            link: "https://www.zola.com/registry/brentandmichaela2024",
            pathName: "registry"
        },

        {
            name: "Dress Code",
            link: "dress-code",
            pathName: "dress-code"
        }
    ];

    const local = useLocation();
    const { pathname } = local;

    const [title, setTitle] = useState("");

    const getPathName = () => {
        let header = "";
        if (pathname === "/") {
            header = "Brent & Michaela";
        } else {
            const path = navigation.find(x => x.pathName === pathname.substring(1));
            header = path!.name;
        }

        return header;
    };

    useEffect(() => {
        const name = getPathName();
        setTitle(name);
    }, [pathname]);

    return isMobile ? (
        <Mobile navigations={navigation} title={title} />
    ) : (
        <Web navigations={navigation} title={title} />
    );
};

const NavItem = (props: { item: NavInfo; index: number }) => {
    const { item, index } = props;
    return (
        <Link
            to={item.link}
            key={`navigation-${index}`}
            style={{
                color: isMobile ? "white" : "black",
                textDecoration: "none",
                fontSize: isMobile ? "30px" : "20px"
            }}
        >
            <p className="nav-item">{item.name}</p>
        </Link>
    );
};

interface HeaderProps {
    navigations: NavInfo[];
    title: string;
}

const Web = (props: HeaderProps) => {
    const nav = useNavigate();

    const { navigations, title } = props;

    return (
        <header
            style={{
                backgroundColor: "transparent",
                position: title === "Travel" ? "absolute" : "fixed",
                color: colors.white,
                width: "100%",
                textAlign: "center",
                padding: "10px 0",
                display: "flex",
                flexDirection: "column",
                height: "15vh",
                zIndex: 2
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1
                }}
            >
                <div
                    style={{
                        flex: 1
                    }}
                ></div>
                <h1
                    style={{
                        cursor: "pointer",
                        flex: 1,
                        color: "black"
                    }}
                    className="michaela-brent-title"
                    onClick={() => nav("/")}
                >
                    {title}
                </h1>
                <div style={{ flex: 1 }}></div>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    flex: 1
                }}
            >
                {navigations.map((item, i) => {
                    return <NavItem item={item} index={i} />;
                })}
            </div>
        </header>
    );
};

const Mobile = (props: HeaderProps) => {
    const nav = useNavigate();

    const { navigations, title } = props;

    const [open, setOpen] = useState(false);

    const theme = createTheme({
        transitions: {
            duration: {
                // shortest: 150,
                // shorter: 200,
                // short: 250,
                // // most basic recommended timing
                standard: 350,
                // // this is to be used in complex animations
                // complex: 375,
                // recommended when something is entering screen
                enteringScreen: 350,
                // recommended when something is leaving screen
                leavingScreen: 300
            },
            easing: {
                // This is the most common easing curve.
                easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
                // Objects enter the screen at full velocity from off-screen and
                // slowly decelerate to a resting point.
                easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
                // Objects leave the screen at full velocity. They do not decelerate when off-screen.
                easeIn: "cubic-bezier(0.4, 0, 1, 1)",
                // The sharp curve is used by objects that may return to the screen at any time.
                sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
            }
        }
    });

    return (
        <header
            style={{
                backgroundColor: colors.green,
                color: colors.white,
                width: "100%",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "15vh"
            }}
        >
            <h1
                style={{
                    cursor: "pointer",

                    fontSize: "30px",
                    padding: "0 15px"
                }}
                onClick={() => nav("/")}
            >
                {title}
            </h1>
            <div style={{ padding: "0 15px" }}>
                <GiCastle
                    color={colors.white}
                    size={30}
                    onClick={() => {
                        setOpen(true);
                    }}
                />
            </div>

            <Drawer
                transitionDuration={{
                    enter: theme.transitions.duration.enteringScreen,
                    exit: theme.transitions.duration.leavingScreen
                }}
                anchor={"right"}
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box
                    sx={{
                        width: "100vw",
                        backgroundColor: colors.green,
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column"
                    }}
                    role="presentation"
                    onClick={() => setOpen(false)}
                    onKeyDown={() => setOpen(false)}
                >
                    <div
                        style={{
                            color: "white",
                            flex: 0.1,
                            padding: "20px"
                        }}
                    >
                        <GiCastle
                            color={colors.white}
                            size={30}
                            onClick={() => {
                                nav("/");
                            }}
                        />
                    </div>
                    <div
                        style={{
                            color: "white",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 0.9,
                            marginBottom: "100px",
                            padding: "30px 0"
                        }}
                    >
                        {navigations.map((item, i) => {
                            return (
                                <div
                                    style={{
                                        borderBottom: i === navigations.length - 1 ? "none" : "1px solid white",

                                        width: "200px",
                                        padding: "20px 0",
                                        textAlign: "center"
                                    }}
                                >
                                    <NavItem item={item} index={i} />
                                </div>
                            );
                        })}
                    </div>
                </Box>
            </Drawer>
        </header>
    );
};
