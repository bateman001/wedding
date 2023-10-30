import { useEffect, useState } from "react";
import { config } from "../config";
import { Party, Guest } from "../utils/types";
import { Person, Rsvp, RSVPContext, RSVPInfo } from "./rsvpContext";

export const RSVPState = (props: any) => {
  // STATES
  const [guests, setGuests] = useState<Guest[]>([]);
  const [rsvp, setRSVP] = useState<Rsvp>({
    name: "",
    rsvp: "yes",
    guestCount: 0,
    guestNames: [],
  });
  const [plusOne, setPlusOne] = useState<number>(0);
  const [allReservations, setAllReservations] = useState<Party[]>([]);
  const [currentParty, setCurrentParty] = useState<Party>({} as Party);

  // USE EFFECTS
  useEffect(() => {
    getAllReservations();
  }, []);

  // useEffect(() => {
  //   if(current){
  //     getAllGuestNumber(current.id);
  //   }
  // }, [current]);

  // FUNCTIONS
  const getAllReservations = async () => {
    const res = await fetch(`${config.api}/party/getAllParties`);
    const reservations: Party[] = await res.json();
    setAllReservations(reservations);
  };

  // const getAllGuestNumber = async (id: number) => {
  //   const res = allReservations.filter((x) => x.id === id)[0];
  //   const guestRes = await fetch(`${config.api}/party/getGuestsByParty/${id}`);
  //   const guests: Guest[] = await guestRes.json();
  //   const pluseOnes: Partial<Guest>[] = [];

  //   for (let i = 0; i < res.allowed_party_number - guests.length; i++) {
  //     pluseOnes.push({
  //       firstname: "Plus",
  //       lastname: "One",
  //       attending: false,
  //       meal: "",
  //       party_id: res.id,
  //     });
  //   }
  //   setPlusOne(pluseOnes);
  //   setGuests(guests);
  //   setCurrentRes(res);
  // }

  const values: RSVPInfo = {
    guests,
    setGuests,
    rsvp,
    setRSVP,
    plusOne,
    setPlusOne,
    allReservations,
    currentParty,
    setCurrentParty,
  };

  return (
    <RSVPContext.Provider value={values}>{props.children}</RSVPContext.Provider>
  );
};
