import React, { useEffect, useState } from "react";
import { getTranslatedText as translate } from "../Localization/Translation";
import { useSelector } from "react-redux";
import { useBetween } from "use-between";
import "./Recommendation.css";

function Recommendation() {
  const {
    locale,
    Category,
    DrinkType, //Alcoholic
    GlassType,
    Ingredients,
    AllCocktails,
  } = useBetween(useSelector((state) => state.useSharedLang));
  const [ListCocktails, setListCocktails] = useState([]);
  useEffect(() => {
    setListCocktails([]);
    for (let i = 0; i < AllCocktails.length; i++) {
      let cock = AllCocktails[i];
      if (cock.strAlcoholic.toUpperCase() === DrinkType.toUpperCase()) {
        if (cock.strCategory.toUpperCase() === Category.toUpperCase()) {
          if (cock.strGlass.toUpperCase() === GlassType.toUpperCase()) {
            let cockIngredients = [
              cock.strIngredient1,
              cock.strIngredient2,
              cock.strIngredient3,
              cock.strIngredient4,
              cock.strIngredient5,
              cock.strIngredient6,
              cock.strIngredient7,
              cock.strIngredient8,
              cock.strIngredient9,
              cock.strIngredient10,
              cock.strIngredient11,
              cock.strIngredient12,
              cock.strIngredient13,
              cock.strIngredient14,
              cock.strIngredient15,
            ];
            let cnt = 0;
            for (let j = 0; j < Ingredients.length; j++) {
              let tmpFlag = false;
              for (let z = 0; z < cockIngredients.length; z++) {
                if (cockIngredients[z] !== null) {
                  if (
                    Ingredients[j].toUpperCase() ===
                    cockIngredients[z].toUpperCase()
                  ) {
                    tmpFlag = true;
                    break;
                  }
                }
              }
              if (tmpFlag) {
                cnt += 1;
              } else{
                break;
              }
            }
            // if all wanted ingredients are contained in the current cocktail
            if (cnt === Ingredients.length) {
              setListCocktails((oldArray) => [...oldArray, cock]);
              cnt = 0;
            }
          }
        }
      }
    }
  }, []);
  return (
    <div className="recommendation-container">
      {ListCocktails.length === 0 ? (
        <div className="no-recommendation">
          <i className="bi bi-emoji-frown animate__animated animate__rubberBand"></i>
          <span>{translate("no-similar-cocktails", locale)}</span>
        </div>
      ) : (
        ListCocktails.map((cock, index) => {
          return (
            <div
              key={index}
              className="recommend-cock-map-container animate__animated animate__jackInTheBox"
            >
              <div className="recommend-cock-map-div">
                <img src={cock.strDrinkThumb} className="recommend-cock-img" />
                <span className="recommend-cock-name">
                  {translate("cock-name", locale)}
                  {cock.strDrink}
                </span>
                <span className="recommend-cock-tags">
                  {translate("tags", locale)}
                  {cock.strTags}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Recommendation;
