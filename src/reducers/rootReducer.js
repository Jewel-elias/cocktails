import { useState } from "react";

const initialState = {
  useSharedLang: () => {
    const [locale, setLocale] = useState("EN");
    const [NameCocktailBar, setNameCocktailBar] = useState("");
    const [FirstNameOwner, setFirstNameOwner] = useState("");
    const [LastNameOwner, setLastNameOwner] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [EmailAddress, setEmailAddress] = useState("");
    const [Category, setCategory] = useState("not-selected-category");
    const [DrinkType, setDrinkType] = useState("not-selected-type-drink");
    const [GlassType, setGlassType] = useState("not-selected-type-glass");
    const [Ingredients, setIngredients] = useState("not-selected-ingredient");

    // Api Data
    const [AllCocktails, setAllCocktails] = useState([]);
    const [AllCategories, setAllCategories] = useState([]);
    const [AllGlasses, setAllGlasses] = useState([]);
    const [AllIngredients, setAllIngredients] = useState([]);
    const [AllTypes, setAllTypes] = useState([]);

    return {
      locale,
      setLocale,
      NameCocktailBar,
      setNameCocktailBar,
      FirstNameOwner,
      setFirstNameOwner,
      LastNameOwner,
      setLastNameOwner,
      PhoneNumber,
      setPhoneNumber,
      EmailAddress,
      setEmailAddress,
      Category,
      setCategory,
      DrinkType,
      setDrinkType,
      GlassType,
      setGlassType,
      Ingredients,
      setIngredients,
      AllCocktails,
      setAllCocktails,
      AllCategories,
      setAllCategories,
      AllGlasses,
      setAllGlasses,
      AllIngredients,
      setAllIngredients,
      AllTypes,
      setAllTypes,
    };
  },
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE-DATE":
      return {};
    default:
      return state;
  }
}

export default rootReducer;
