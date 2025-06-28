import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

// Define the type for location coordinates
type Coordinates = {
  lat: number;
  lng: number;
} | null;

// Context type definition
type RentalContextType = {
  rentalDate: string;
  returnDate: string;
  location: string;
  customLocation: Coordinates;
  setRentalDate: (date: string) => void;
  setReturnDate: (date: string) => void;
  setLocation: (location: string) => void;
  setCustomLocation: (location: Coordinates) => void;
};

// Create the context
const RentalContext = createContext<RentalContextType | undefined>(undefined);

// Provider component
export const RentalProvider = ({ children }: { children: ReactNode }) => {

  const [rentalDate, setRentalDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [location, setLocation] = useState<string>("اختر الموقع");
  const [customLocation, setCustomLocation] = useState<Coordinates>(null);

  return (
    <RentalContext.Provider
      value={{
        rentalDate,
        returnDate,
        location,
        customLocation,
        setRentalDate,
        setReturnDate,
        setLocation,
        setCustomLocation,
      }}
    >
      {children}
    </RentalContext.Provider>
  );
};

// Custom hook to access the context
export const useRental = (): RentalContextType => {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error("useRental must be used within a RentalProvider");
  }
  return context;
};
