import React from "react";

interface UserContextValue {
  initials?: string | null;
  token?: string | null;
  currentBaseId?: string | null;
  setUser: (newUser: any) => void;
  clear: () => void;
}

export const UserContext = React.createContext<UserContextValue | null>({
  setUser: () => {},
  clear: () => {},
});
