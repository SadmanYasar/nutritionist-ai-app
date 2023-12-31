import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getItem, setItem } from "utils/asyncStorage";

type DietContextType = {
  dietPreference: string[];
  dietRestrictions: string[];
  extractedText: string;
  setDietPreference: (dietPreference: string[]) => void;
  setDietRestrictions: (dietRestrictions: string[]) => void;
  setExtractedText: (extractedText: string) => void;
};

export const DietContext = React.createContext<DietContextType>({
  dietPreference: [],
  dietRestrictions: [],
  extractedText: "",
  setDietPreference: () => { },
  setDietRestrictions: () => { },
  setExtractedText: () => { },
});

export const DietProvider = ({ children }) => {
  const [dietPreference, setDietPreference] = useState<string | string[]>([]);
  const [dietRestrictions, setDietRestrictions] = useState<string | string[]>(
    []
  );
  const [extractedText, setExtractedText] = useState<string>("");

  useEffect(() => {
    const loadDietData = async () => {
      try {
        const storedDietPreference = await getItem("dietPreference");
        const storedDietRestrictions = await getItem("dietRestrictions");

        if (storedDietPreference) {
          setDietPreference(JSON.parse(storedDietPreference));
        }

        if (storedDietRestrictions) {
          setDietRestrictions(JSON.parse(storedDietRestrictions));
        }

        console.log("Diet Preference:", storedDietPreference);
        console.log("Diet Restrictions:", storedDietRestrictions);
      } catch (error) {
        console.error("Error loading diet data from AsyncStorage:", error);
      }
    };

    loadDietData();
  }, []);

  useEffect(() => {
    const saveDietData = async () => {
      try {
        await setItem("dietPreference", JSON.stringify(dietPreference));
        await setItem("dietRestrictions", JSON.stringify(dietRestrictions));
      } catch (error) {
        console.error("Error saving diet data to AsyncStorage:", error);
      }
    };

    saveDietData();
    console.log("Diet Preference:", dietPreference);
    console.log("Diet Restrictions:", dietRestrictions);
  }, [dietPreference, dietRestrictions]);

  return (
    <DietContext.Provider
      value={{
        dietPreference,
        dietRestrictions,
        extractedText,
        setDietPreference,
        setDietRestrictions,
        setExtractedText,
      }}
    >
      {children}
    </DietContext.Provider>
  );
};
