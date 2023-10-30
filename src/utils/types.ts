export interface Party {
  id: number;
  party_name: string;
  allowed_party_number: number;
}

export interface Guest {
  id: number;
  firstname: string;
  lastname: string;
  attending: boolean;
  meal: string;
  party_id: number;
  is_plus_one: boolean;
}

export interface CreateGuestReq {
  firstname: string;
  lastname: string;
  attending: boolean;
  meal: string;
  party_id: number;
}

/**
 * /UpdateGuest
 */
export interface UpdateGuest {
  firstname?: string;
  lastname?: string;
  attending?: boolean;
  meal?: string;
}
export interface UpdateGuestReq {
  data: UpdateGuest;
  id: number;
}
