import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { colors } from "../utils/colors";
import { Guest, guests } from "../utils/guests";
import { isMobile } from "react-device-detect";
import { FoodChoice, R, Person, RSVPContext } from "../context/rsvpContext";
import * as Ramda from "ramda";

export const RSVP = () => {
  // NAVIGATION
  const location = useLocation();
  const nav = useNavigate();

  // CONTEXT
  const context = useContext(RSVPContext);
  const { guest, setGuest, rsvp, setRSVP, plusOne, setPlusOne } = context;

  // STATE
  const [step, setStep] = useState<number | string>(
    parseInt(location.search.split("=")[1])
  );
  const [errors, setErrors] = useState(false);

  // UseEffects
  useEffect(() => {
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
  }, [location.search]);

  // FUNCTIONS

  const getGuestInfo = () => {
    const gst: Guest | undefined = guests.find(
      (x) => x.reservationName === rsvp.name
    );

    if (guest !== undefined) {
      const names: Person[] = [];
      const pluses: Person[] = [];

      gst?.persons.map((x) => {
        const info: Person = {
          name: x,
          checked: true,
          food: "chicken",
        };
        names.push(info);
      });

      if (gst!.allotedGuestCount > gst!.persons.length) {
        const extraNum = gst!.allotedGuestCount - gst!.persons.length;
        for (let i = 0; i < extraNum; i++) {
          pluses.push({
            name: `Plus ${i + 1}`,
            checked: false,
            food: "chicken",
          });
        }
      }

      setGuest(gst as Guest);
      setRSVP({ ...rsvp, guestNames: names });
      setPlusOne(pluses);
      setErrors(false);

      nav("/rsvp?step=2");
    } else {
      setErrors(true);
    }
  };

  const updateRSVP = (update: R, text: string) => {
    const info = { ...rsvp };

    setRSVP({ ...info, [update]: text });
  };

  const checkRSVP = () => {
    if (rsvp.rsvp === "yes") {
      guest.allotedGuestCount === 1 ? nav("/rsvp?step=5") : nav("/rsvp?step=3");
    }
    if (rsvp.rsvp === "no") {
      nav("/rsvp?reservation=no");
      sendRSVPConfirmation();
    }
  };

  const updateChecked = (name: string, checked: boolean) => {
    const names = [...rsvp.guestNames];
    const index = names.findIndex((x) => x.name === name);
    const person = names[index];

    person!.checked = checked;

    setRSVP({ ...rsvp, guestNames: names });
  };

  const updatePlusOne = (name: string, checked: boolean) => {
    const names = [...plusOne];
    const index = names.findIndex((x) => x.name === name);
    const person = names[index];

    person!.checked = checked;

    setPlusOne(names);
  };

  const isChecked = (person: Person): boolean => {
    return person.checked;
  };

  const checkGuests = () => {
    if (Ramda.any(isChecked)(plusOne)) {
      nav("/rsvp?step=4");
    } else {
      nav("/rsvp?step=5");
    }
  };

  const updatePlusOneName = (index: number, name: string) => {
    const pluses = [...plusOne];
    const person = pluses[index];
    person.name = name;

    setPlusOne(pluses);
  };

  const addPlusOne = async () => {
    console.log("plusOne", plusOne);

    // const allGuests = [...rsvp.guestNames];
    // const allPluses = plusOne.filter((x) => x.checked);

    // const combination = Ramda.concat(allGuests, allPluses);

    // console.log("combo", combination);
    // await setRSVP({ ...rsvp, guestNames: combination });

    await nav("/rsvp?step=5");
  };

  const updateMeal = (index: number, food: FoodChoice) => {
    console.log("index", index);
    console.log("food", food);
    const names = [...rsvp.guestNames];
    const person = names[index];
    person.food = food;
    console.log("person", person);
    setRSVP({ ...rsvp, guestNames: names });
  };

  const confirmReservation = () => {
    let count = 0;
    const pluses = plusOne.filter((x) => x.checked === true);
    const guests = rsvp.guestNames.filter((x) => x.checked === true);
    const combination = Ramda.concat(guests, pluses);

    console.log("allGuests", combination);
    for (const person of combination) {
      if (person.checked) {
        count = count + 1;
      }
    }
    setRSVP({ ...rsvp, guestCount: count });
    nav("/rsvp?reservation=yes");
    sendRSVPConfirmation();
  };

  const sendRSVPConfirmation = () => {
    console.log("rsvp", rsvp);
  };

  const ButtonGroup = (props: { next: any }) => {
    return (
      <div
        style={{
          width: isMobile ? "90%" : "25%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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

  const goBack = () => {
    return nav(-1);
  };

  return (
    <div className="rsvp">
      {step === 1 && (
        <div
          style={{
            height: "inherit",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "10px",
          }}
        >
          <h2>Please enter the name on your invitation</h2>
          <TextField
            placeholder="e.g. The Smith Family"
            onChange={(e) => {
              updateRSVP("name", e.target.value);
            }}
            error={errors}
            style={{
              margin: "10px 0",
              backgroundColor: colors.white,
              width: "40vh",
            }}
            value={rsvp.name}
            helperText={errors ? "Incorrect Entry" : ""}
          />
          <button className="next-button" onClick={() => getGuestInfo()}>
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
            padding: "10px",
            // border: "1px solid red",
          }}
        >
          <h2>
            Will {guest.persons.length > 1 ? "your party" : "you"} be attending
            the wedding of Brent & Michaela?
          </h2>

          <div style={{ margin: "10px 0" }}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={rsvp.rsvp}
                onChange={(e) => updateRSVP("rsvp", e.target.value)}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </div>

          <ButtonGroup next={checkRSVP} />
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
            padding: "10px",
          }}
        >
          <h2>Who should we include in your party?</h2>

          <div style={{ margin: "10px 0" }}>
            <FormControl>
              {rsvp.guestNames.map((person, i) => (
                <FormControlLabel
                  key={`person-${i}`}
                  control={
                    <Checkbox
                      value={person.checked}
                      checked={person.checked}
                      onChange={() =>
                        updateChecked(person.name, !person.checked)
                      }
                    />
                  }
                  label={person.name}
                />
              ))}
              {plusOne.map((person, i) => (
                <FormControlLabel
                  key={`plus-${i}`}
                  control={
                    <Checkbox
                      value={person.checked}
                      checked={person.checked}
                      onChange={() =>
                        updatePlusOne(person.name, !person.checked)
                      }
                    />
                  }
                  label={person.name}
                />
              ))}
            </FormControl>
          </div>

          <ButtonGroup next={checkGuests} />
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
            padding: "10px",
          }}
        >
          {plusOne.map((person, i) => {
            if (person.checked) {
              return (
                <div key={`plus-${i}`}>
                  <h2>What is the name of your Plus {i + 1}?</h2>

                  <div style={{ margin: "10px 0" }}>
                    <TextField
                      placeholder="Jane Doe"
                      onChange={(e) => {
                        updatePlusOneName(i, e.target.value);
                      }}
                      error={errors}
                      style={{
                        margin: "10px 0",
                        backgroundColor: colors.white,
                        width: "40vh",
                      }}
                      value={person.name}
                      helperText={errors ? "Incorrect Entry" : ""}
                    />
                  </div>
                </div>
              );
            }
          })}

          <ButtonGroup next={() => nav("/rsvp?step=5")} />
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
            padding: "10px",
            border: "1px solid red",
          }}
        >
          <h2>Please choose meal preference</h2>

          <div style={{ margin: "20px 0" }}>
            {rsvp.guestNames.map((guest, i) => {
              if (guest.checked) {
                return (
                  <div key={`meal-${i}`}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: isMobile ? "300px" : "500px",
                        margin: "10px 0",
                      }}
                    >
                      <h2>{guest.name}</h2>
                      <Select
                        value={guest.food}
                        onChange={(e) =>
                          updateMeal(i, e.target.value as FoodChoice)
                        }
                        autoWidth
                      >
                        <MenuItem value="chicken">Chicken</MenuItem>
                        <MenuItem value="fish">Fish</MenuItem>
                        <MenuItem value="vegetarian">Vegetarian</MenuItem>
                      </Select>
                    </div>
                  </div>
                );
              }
            })}
            {plusOne.map((guest, i) => {
              if (guest.checked) {
                return (
                  <div key={`meal-plus-${i}`}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: isMobile ? "300px" : "500px",
                        margin: "10px 0",
                      }}
                    >
                      <h2>{guest.name}</h2>
                      <Select
                        value={guest.food}
                        onChange={(e) =>
                          updateMeal(i, e.target.value as FoodChoice)
                        }
                        autoWidth
                      >
                        <MenuItem value="chicken">Chicken</MenuItem>
                        <MenuItem value="fish">Fish</MenuItem>
                        <MenuItem value="vegetarian">Vegetarian</MenuItem>
                      </Select>
                    </div>
                  </div>
                );
              }
            })}
          </div>

          <ButtonGroup next={() => nav("/rsvp?step=6")} />
        </div>
      )}

      {step === 6 && (
        <div
          style={{
            height: "inherit",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "10px",
          }}
        >
          <h1 style={{ fontSize: "50px" }}>Your Reservation</h1>

          <div
            style={{
              margin: "20px 0",
              width: isMobile ? "80vw" : "30vw",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  padding: "10px 0",
                  borderTop: "1px solid black",
                }}
              >
                <h2>Guest Info</h2>
              </div>

              <div
                style={{
                  borderTop: "1px solid black",
                  backgroundColor: "#f1f5f26b",
                }}
              >
                {rsvp.guestNames.map((person, i) => {
                  return (
                    <div key={`person-${i}`}>
                      {person.checked && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "10px 0",
                          }}
                        >
                          <div style={{ textAlign: "left" }}>
                            <h3>Name</h3>
                            <p>{person.name}</p>
                          </div>
                          <div style={{ textAlign: "left", width: "80px" }}>
                            <h3>Food</h3>
                            <p>{person.food}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {plusOne.map((person, i) => {
                  return (
                    <div key={`person-plus-${i}`}>
                      {person.checked && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "10px 0",
                          }}
                        >
                          <div style={{ textAlign: "left" }}>
                            <h3>Name</h3>
                            <p>{person.name}</p>
                          </div>
                          <div style={{ textAlign: "left", width: "80px" }}>
                            <h3>Food</h3>
                            <p>{person.food}</p>
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
              alignItems: "center",
            }}
          >
            <button className="next-button" onClick={() => goBack()}>
              Back
            </button>

            <button
              className="next-button"
              onClick={() => confirmReservation()}
            >
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
            padding: "10px",
          }}
        >
          <h2>We are so sad to hear you will not be joining us!</h2>

          <p style={{ margin: "10px 0" }}>
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
            padding: "10px",
          }}
        >
          <h2 style={{ fontSize: "50px" }}>Hooray!</h2>

          <p style={{ margin: "10px 0" }}>
            We cannot wait to celebrate with{" "}
            {rsvp.guestCount > 1 ? "you all" : "you"}!
          </p>

          <p>We have reserved {rsvp.guestCount} seats in your honor.</p>
          <button className="next-button" onClick={() => nav("/")}>
            Done
          </button>
        </div>
      )}
    </div>
  );
};
