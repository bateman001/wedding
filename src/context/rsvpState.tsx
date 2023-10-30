import { useEffect, useState } from "react";
import { config } from "../config";
import { Party, Guest } from "../utils/types";
import { Rsvp, RSVPContext, RSVPInfo } from "./rsvpContext";

export const RSVPState = (props: any) => {
    // STATES
    const [guests, setGuests] = useState<Guest[]>([]);
    const [rsvp, setRSVP] = useState<Rsvp>({
        name: "",
        rsvp: "yes",
        guestCount: 0,
        guestNames: []
    });
    const [plusOne, setPlusOne] = useState<number>(0);
    const [allReservations, setAllReservations] = useState<Party[]>([]);
    const [currentParty, setCurrentParty] = useState<Party>({} as Party);

    // USE EFFECTS
    useEffect(() => {
        getAllReservations();
    }, []);

    // FUNCTIONS
    const getAllReservations = async () => {
        const res = await fetch(`${config.api}/party/getAllParties`);
        const reservations: Party[] = await res.json();
        setAllReservations(reservations);
    };

    const values: RSVPInfo = {
        guests,
        setGuests,
        rsvp,
        setRSVP,
        plusOne,
        setPlusOne,
        allReservations,
        currentParty,
        setCurrentParty
    };

    return <RSVPContext.Provider value={values}>{props.children}</RSVPContext.Provider>;
};
