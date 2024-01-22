import { TextField, FormControlLabel, FormControl, Checkbox, Select, MenuItem, InputLabel } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { colors } from "../utils/colors";
import { isMobile } from "react-device-detect";
import { FoodChoice, RSVPContext } from "../context/rsvpContext";
import { CreateGuestReq, Guest, UpdateGuestReq } from "../utils/types";
import { config } from "../config";

export const RSVP = () => {
    // NAVIGATION
    const location = useLocation();
    const nav = useNavigate();

    // CONTEXT
    const context = useContext(RSVPContext);
    const { guests, setGuests, allReservations, setCurrentParty, currentParty } = context;

    // STATE
    const [step, setStep] = useState<number | string>(parseInt(location.search.split("=")[1]));
    const [errors, setErrors] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [rsvps, setRSVPS] = useState<number>(0);

    // CALLBACKS
    const getStep = useCallback(() => {
        const position = location.search.split("=")[0];
        if (position === "?step") {
            const num = parseInt(location.search.split("=")[1]);
            if (num !== step) {
                setStep(num);
            }
        } else {
            const confirmation = location.search.split("=")[1];
            setStep(confirmation);
        }
    }, [location.search, step]);

    // UseEffects
    useEffect(() => {
        getStep();
    }, [getStep]);

    // FUNCTIONS
    const checkRSVP = () => {
        let nextStep = 4;

        for (const guest of guests) {
            if (guest.attending && guest.is_plus_one) {
                nextStep = 3;
                break;
            }
        }
        nav(`/rsvp?step=${nextStep}`);
    };

    const updateChecked = (i: number, checked: boolean) => {
        const names = [...guests];
        const person = names[i];
        person.attending = checked;
        setGuests(names);
    };

    const updateMeal = (index: number, food: FoodChoice) => {
        const names = [...guests];
        const person = names[index];
        person.meal = food;
        setGuests(names);
    };

    const createGuest = async (guest: CreateGuestReq) => {
        await fetch(`${config.api}/guest/createGuest`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": config.api_key as string
            },
            body: JSON.stringify(guest)
        });
    };

    const sendGuestUpdate = async (data: UpdateGuestReq) => {
        await fetch(`${config.api}/guest/updateGuest`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": config.api_key as string
            },
            body: JSON.stringify(data)
        });
    };

    const confirmReservation = async () => {
        setLoading(true);
        let count = 0;

        for (const guest of guests) {
            if (guest.attending) {
                count = count + 1;
                if (guest.is_plus_one) {
                    // create guest

                    const data: CreateGuestReq = {
                        firstname: guest.firstname,
                        lastname: guest.lastname,
                        attending: true,
                        meal: guest.meal,
                        party_id: currentParty.id
                    };
                    await createGuest(data);
                } else {
                    // update guest

                    const data: UpdateGuestReq = {
                        data: {
                            attending: true,
                            meal: guest.meal
                        },
                        id: guest.id
                    };
                    await sendGuestUpdate(data);
                }
            }
        }
        setRSVPS(count);
        await nav("/rsvp?reservation=yes");
        setLoading(false);
    };

    const goBack = () => {
        return nav(-1);
    };

    const getReservation = async (id: number) => {
        const res = allReservations.filter(x => x.id === id)[0];
        const guestRes = await fetch(`${config.api}/party/getGuestsByParty/${id}`, {
            headers: {
                "content-type": "application/json",
                "x-api-key": config.api_key as string
            }
        });
        const guests: Guest[] = await guestRes.json();
        // const pluseOnes: Partial<Guest>[] = [];
        const diff = res.allowed_party_number - guests.length;
        for (let i = 0; i < diff; i++) {
            const plus = {
                id: 0,
                firstname: "",
                lastname: "",
                attending: false,
                meal: "",
                party_id: res.id,
                is_plus_one: true
            };

            guests.push(plus);
        }

        setGuests(guests);
        setCurrentParty(res);
    };

    const updateGuest = (index: number, key: "firstname" | "lastname", update: string) => {
        const gsts = [...guests];
        const gst = gsts[index];
        gst[key] = update;

        setGuests(gsts);
    };

    const ButtonGroup = (props: { next: any }) => {
        return (
            <div
                style={{
                    width: isMobile ? "100%" : "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <button className="next-button" onClick={() => goBack()}>
                    Back
                </button>
                <button className="next-button" onClick={() => props.next()}>
                    Next
                </button>
            </div>
        );
    };

    const checkGuests = () => {
        let error = false;
        for (const guest of guests) {
            if (guest.attending) {
                if (guest.firstname === "") {
                    error = true;
                }
                if (guest.lastname === "") {
                    error = true;
                }
            }
        }

        setErrors(error);

        if (!error) {
            nav("/rsvp?step=4");
        }
    };

    return (
        <div
            className="rsvp"
            style={{
                height: isMobile ? "85vh" : "100vh"
            }}
        >
            {step === 1 && (
                <div
                    style={{
                        height: "inherit",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "10px"
                    }}
                >
                    <h2>Choose your reservation</h2>
                    <FormControl style={{ width: isMobile ? "90%" : "20%", margin: "20px 0 " }}>
                        <InputLabel id="demo-simple-select-label">Reservation Name</InputLabel>
                        <Select value={currentParty?.party_name} label="Reservation Name">
                            {allReservations.map((x, i) => {
                                return (
                                    <MenuItem
                                        key={`party-${i}`}
                                        value={x.party_name}
                                        onClick={() => getReservation(x.id)}
                                    >
                                        {x.party_name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <button className="next-button" onClick={() => nav("/rsvp?step=2")}>
                        Next
                    </button>
                </div>
            )}
            {step === 2 && (
                <div
                    style={{
                        height: "inherit",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "10px"
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                            minHeight: "30%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <h2>Who in your party will be attending?</h2>

                        <div
                            style={{
                                margin: "20px 0",
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            {guests.map((val, i) => {
                                return (
                                    <>
                                        <FormControlLabel
                                            key={`person-${i}`}
                                            control={
                                                <Checkbox
                                                    value={val.attending}
                                                    checked={val.attending}
                                                    onChange={() => updateChecked(i, !val.attending)}
                                                />
                                            }
                                            label={
                                                val.firstname === "" ? "Plus One" : `${val.firstname} ${val.lastname}`
                                            }
                                        />
                                    </>
                                );
                            })}
                        </div>

                        <div
                            style={{
                                width: "100%"
                            }}
                        >
                            <ButtonGroup next={checkRSVP} />
                        </div>

                        <button
                            style={{
                                width: isMobile ? "90%" : "100%"
                            }}
                            className="deny-button"
                            onClick={() => nav("/rsvp?reservation=no")}
                        >
                            We will not be attending
                        </button>
                    </div>
                </div>
            )}
            {step === 3 && (
                <div
                    style={{
                        height: "inherit",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "10px"
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                            minHeight: "30%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <h2>Please enter the name of your Plus 1?</h2>

                        {guests.map((person, i) => {
                            if (person.attending && person.is_plus_one) {
                                return (
                                    <div
                                        key={`plus-${i}`}
                                        style={{
                                            margin: "10px 0",
                                            width: "100%"
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                width: "100%"
                                            }}
                                        >
                                            <div
                                                style={{
                                                    padding: "10px 0",
                                                    width: "100%"
                                                }}
                                            >
                                                <TextField
                                                    placeholder="First Name"
                                                    onChange={e => {
                                                        updateGuest(i, "firstname", e.target.value);
                                                    }}
                                                    error={errors}
                                                    style={{
                                                        // marginRight: "5px",
                                                        backgroundColor: colors.white,
                                                        width: "100%"
                                                    }}
                                                    value={person.firstname}
                                                    helperText={errors ? "Incorrect Entry" : ""}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    padding: "10px 0",
                                                    width: "100%"
                                                }}
                                            >
                                                <TextField
                                                    placeholder="Last Name"
                                                    onChange={e => {
                                                        updateGuest(i, "lastname", e.target.value);
                                                    }}
                                                    error={errors}
                                                    style={{
                                                        // marginLeft: "5px",
                                                        backgroundColor: colors.white,
                                                        width: "100%"
                                                    }}
                                                    value={person.lastname}
                                                    helperText={errors ? "Incorrect Entry" : ""}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return <></>;
                            }
                        })}

                        <div
                            style={{
                                width: "100%"
                            }}
                        >
                            <ButtonGroup next={() => checkGuests()} />
                        </div>
                    </div>
                </div>
            )}
            {step === 4 && (
                <div
                    style={{
                        height: "inherit",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "10px"
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                            minHeight: "30%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <h2>Please choose meal preference</h2>

                        <div style={{ margin: "20px 0" }}>
                            {guests.map((guest, i) => {
                                if (guest.attending) {
                                    return (
                                        <div key={`meal-${i}`}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    width: isMobile ? "300px" : "500px",
                                                    margin: "10px 0"
                                                }}
                                            >
                                                <h2 style={{ fontSize: isMobile ? "20px" : "30px" }}>
                                                    {guest.firstname} {guest.lastname}
                                                </h2>
                                                <Select
                                                    value={guest.meal}
                                                    onChange={e => updateMeal(i, e.target.value as FoodChoice)}
                                                    placeholder="Choose Meal"
                                                    style={{ width: "50%" }}
                                                >
                                                    <MenuItem value="chicken">Chicken</MenuItem>
                                                    <MenuItem value="fish">Fish</MenuItem>
                                                    <MenuItem value="vegetarian">Vegetarian</MenuItem>
                                                </Select>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return <></>;
                                }
                            })}
                        </div>
                        <div style={{ margin: "20px 0" }}>
                            <p style={{ color: "red" }}>
                                *Please reach out to the Bride and Groom if anyone in your party has a food allergy.
                            </p>
                        </div>

                        <div
                            style={{
                                width: "100%"
                            }}
                        >
                            <ButtonGroup next={() => nav("/rsvp?step=5")} />
                        </div>
                    </div>
                </div>
            )}
            {step === 5 && (
                <div
                    style={{
                        height: "inherit",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "10px"
                    }}
                >
                    <h1 style={{ fontSize: "50px" }}>Your Reservation</h1>

                    <div
                        style={{
                            margin: "20px 0",
                            width: isMobile ? "80vw" : "30vw"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <div
                                style={{
                                    textAlign: "left",
                                    padding: "10px 0",
                                    borderTop: "1px solid black"
                                }}
                            >
                                <h2>Guest Info</h2>
                            </div>

                            <div
                                style={{
                                    borderTop: "1px solid black",
                                    backgroundColor: "#f1f5f26b"
                                }}
                            >
                                {guests.map((person, i) => {
                                    return (
                                        <div key={`person-${i}`}>
                                            {person.attending && (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        padding: "10px 0"
                                                    }}
                                                >
                                                    <div style={{ textAlign: "left" }}>
                                                        <h3>Name</h3>
                                                        <p>
                                                            {person.firstname} {person.lastname}
                                                        </p>
                                                    </div>
                                                    <div style={{ textAlign: "left", width: "80px" }}>
                                                        <h3>Meal</h3>
                                                        <p>{person.meal}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            width: isMobile ? "90%" : "25%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <button className="next-button" onClick={() => goBack()}>
                            Back
                        </button>

                        <button className="next-button" onClick={() => confirmReservation()}>
                            Confirm
                        </button>
                    </div>
                </div>
            )}
            {step === "no" && (
                <div
                    style={{
                        height: "inherit",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "10px"
                    }}
                >
                    <h2>We are so sad to hear you will not be joining us!</h2>

                    <p style={{ margin: "10px 0 20px 0" }}>
                        We completely understand not being able to make our event
                        <br />
                        nonetheless your presence will be missed.
                    </p>

                    <button className="next-button" onClick={() => nav("/")}>
                        Done
                    </button>
                </div>
            )}
            {step === "yes" && (
                <div
                    style={{
                        height: "inherit",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "10px"
                    }}
                >
                    <h2 style={{ fontSize: "50px" }}>Hooray!</h2>
                    <h3 style={{ margin: "10px 0 " }}>
                        {rsvps} {rsvps > 1 ? "seats are" : "seat is"} reserved in your honor.
                    </h3>

                    <p style={{ margin: "10px 0 20px 0" }}>We cannot wait to celebrate with you!</p>

                    <button className="next-button" onClick={() => nav("/")}>
                        Done
                    </button>
                </div>
            )}
        </div>
    );
};
