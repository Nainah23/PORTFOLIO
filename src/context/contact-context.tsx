import { createContext, useContext, useState, type ReactNode } from "react";

interface ContactContextValue {
  openContact: () => void;
  closeContact: () => void;
  isContactOpen: boolean;
}

const ContactContext = createContext<ContactContextValue | undefined>(undefined);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  return (
    <ContactContext.Provider value={{ openContact, closeContact, isContactOpen }}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used within ContactProvider");
  return ctx;
}
