import { createContext } from "react";
import { Party, Guest } from "../utils/types";
export type FoodChoice = "chicken" | "fish" | "vegetarian";

export interface Person {
  name: string;
  checked: boolean;
  food: FoodChoice;
}

export interface Rsvp {
  name: string;
  rsvp: "yes" | "no";
  guestCount: number;
  guestNames: Person[];
}

export type R = keyof Rsvp;

export interface RSVPInfo {
  guests: Guest[];
  setGuests: (guests: Guest[]) => void;
  rsvp: Rsvp;
  setRSVP: (rsvp: Rsvp) => void;
  plusOne: number;
  setPlusOne: (plusOnes: number) => void;
  allReservations: Party[];
  currentParty: Party;
  setCurrentParty: (current: Party) => void;
}

export const RSVPContext = createContext<RSVPInfo>({} as RSVPInfo);
