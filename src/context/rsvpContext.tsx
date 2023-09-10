import { createContext } from "react";
import { Guest } from "../utils/guests";
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
  guest: Guest;
  setGuest: (guest: Guest) => void;
  rsvp: Rsvp;
  setRSVP: (rsvp: Rsvp) => void;
  plusOne: Person[];
  setPlusOne: (plusOnes: Person[]) => void;
}

export const RSVPContext = createContext<RSVPInfo>({} as RSVPInfo);
