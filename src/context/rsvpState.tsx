import { useEffect, useState } from "react";
import { Guest, guests } from "../utils/guests";
import { Person, Rsvp, RSVPContext, RSVPInfo } from "./rsvpContext";

export const RSVPState = (props: any) => {
  // STATES
  const [guest, setGuest] = useState<Guest>({} as Guest);
  const [rsvp, setRSVP] = useState<Rsvp>({
    name: "",
    rsvp: "yes",
    guestCount: 0,
    guestNames: [],
  });
  const [plusOne, setPlusOne] = useState<Person[]>([]);

  // USE EFFECTS

  // FUNCTIONS

  const values: RSVPInfo = {
    guest,
    setGuest,
    rsvp,
    setRSVP,
    plusOne,
    setPlusOne,
  };

  return (
    <RSVPContext.Provider value={values}>{props.children}</RSVPContext.Provider>
  );
};
