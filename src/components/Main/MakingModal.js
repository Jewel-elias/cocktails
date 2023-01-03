import React from "react";
import "./MakingModal.css";
import { getTranslatedText as translate } from "../Localization/Translation";
import { useSelector } from "react-redux";
import { useBetween } from "use-between";
import { useEffect } from "react";
import Axios from "axios";

function MakingModal() {
  const {
    locale,
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
  } = useBetween(useSelector((state) => state.useSharedLang));

  useEffect(() => {
    (async () => {
      const headers = {
        "content-type": "application/json;charset=UTF-8",
      };

      // Get All Cocktails
      await Axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s`,
        {
          headers,
        }
      )
        .then((res) => {
          console.log("Cocktails: ");
          console.log(res.data.drinks);
          setAllCocktails(res.data.drinks);
        })
        .catch((err) => console.log(err));

      // Get Ingredients
      await Axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`,
        {
          headers,
        }
      )
        .then((res) => {
          console.log("Ingredients: ");
          console.log(res.data.drinks);
          setAllIngredients(res.data.drinks);
        })
        .catch((err) => console.log(err));

      // Get Glasses
      await Axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list`,
        {
          headers,
        }
      )
        .then((res) => {
          console.log("Glasses: ");
          console.log(res.data.drinks);
          setAllGlasses(res.data.drinks);
        })
        .catch((err) => console.log(err));

      // Get Categories
      await Axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`,
        {
          headers,
        }
      )
        .then((res) => {
          console.log("Categories: ");
          console.log(res.data.drinks);
          setAllCategories(res.data.drinks);
        })
        .catch((err) => console.log(err));

      // Get Alcoholic Types
      await Axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list`,
        {
          headers,
        }
      )
        .then((res) => {
          console.log("Alcoholic Types: ");
          console.log(res.data.drinks);
          setAllTypes(res.data.drinks);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  const clickField = (event, id) => {
    document.getElementById(id).classList.remove("is-invalid");
  };

  const changeField = (event, id) => {
    if (id === "name-cocktail-bar") {
      setNameCocktailBar(event.target.value);
    } else if (id === "first-name-owner") {
      setFirstNameOwner(event.target.value);
    } else if (id === "last-name-owner") {
      setLastNameOwner(event.target.value);
    } else if (id === "phone-number") {
      setPhoneNumber(event.target.value);
    } else if (id === "email") {
      setEmailAddress(event.target.value);
    } else if (id === "select-category") {
      setCategory(event.target.value);
    } else if (id === "drink") {
      setDrinkType(event.target.value);
    } else if (id === "glass") {
      setGlassType(event.target.value);
    } else if (id === "ingredients") {
      if (event.target.value === "not-selected-ingredient") {
        setIngredients(event.target.value);
      } else if (Ingredients === "not-selected-ingredient") {
        setIngredients([event.target.value]);
      } else {
        setIngredients((oldArray) => [...oldArray, event.target.value]);
      }
    }
  };
  const RemoveIngredient = (id) => {
    if (Ingredients.length === 1) {
      setIngredients("not-selected-ingredient");
    } else {
      setIngredients(
        Ingredients.filter(function (value, index) {
          return index !== id;
        })
      );
    }
  };
  return (
    <div dir="auto">
      {/* STEPPER */}
      <section className="step-wizard" dir="ltr">
        <ul className="step-wizard-list">
          <li
            className="step-wizard-item current-item "
            id="step-1-add-item-bar"
          >
            <span className="progress-count">
              <i className="bi bi-person-fill progress-step-bar animate__animated animate__rubberBand"></i>
            </span>
            <span className="progress-label animate__animated animate__rubberBand">
              {translate("personal-step-label", locale)}
            </span>
          </li>
          <li
            className="step-wizard-item"
            id="step-2-add-item-bar"
          >
            <span className="progress-count">
              <i className="bi bi-cup-straw progress-step-bar animate__animated animate__rubberBand"></i>
            </span>
            <span className="progress-label animate__animated animate__rubberBand">
              {translate("details-step-label", locale)}
            </span>
          </li>
          <li
            className="step-wizard-item"
            id="step-3-add-item-bar"
          >
            <span className="progress-count">
              <i className="bi bi-three-dots progress-step-bar animate__animated animate__rubberBand"></i>
            </span>
            <span className="progress-label animate__animated animate__rubberBand">
              {translate("review-step-label", locale)}
            </span>
          </li>
        </ul>
      </section>

      {/* Step 1 */}
      <ul
        className="list-group list-group-flush list-add-item current-list animate__animated animate__fadeIn"
        id="step-1-add-item-content"
        dir="ltr"
      >
        {/* Name of cocktail bar */}
        <li className="input-field-add-item required-input">
          <input
            type="text"
            id="name-cocktail-bar"
            className="input-add-item form-control"
            onChange={(event) => changeField(event, "name-cocktail-bar")}
            onClick={(event) => clickField(event, "name-cocktail-bar")}
            required
          />
          <label htmlFor="name-cocktail-bar" className="label-add-item">
            {translate("name-of-cocktail-bar", locale)}
          </label>
          <div className="invalid-feedback">
            {translate("please-enter-name", locale)}
          </div>
        </li>
        {/* First name of owner */}
        <li className="input-field-add-item required-input">
          <input
            type="text"
            id="first-name-owner"
            className="input-add-item form-control"
            onChange={(event) => changeField(event, "first-name-owner")}
            onClick={(event) => clickField(event, "first-name-owner")}
            required
          />
          <label htmlFor="first-name-owner" className="label-add-item">
            {translate("first-name-of-owner", locale)}
          </label>
          <div className="invalid-feedback">
            {translate("please-enter-first-name", locale)}
          </div>
        </li>
        {/* Last name of owner */}
        <li className="input-field-add-item required-input">
          <input
            type="text"
            id="last-name-owner"
            className="input-add-item form-control"
            onChange={(event) => changeField(event, "last-name-owner")}
            onClick={(event) => clickField(event, "last-name-owner")}
            required
          />
          <label htmlFor="last-name-owner" className="label-add-item">
            {translate("last-name-of-owner", locale)}
          </label>
          <div className="invalid-feedback">
            {translate("please-enter-last-name", locale)}
          </div>
        </li>
        {/* Phone number */}
        <li className="input-field-add-item required-input">
          <input
            type="text"
            id="phone-number"
            className="input-add-item form-control"
            onChange={(event) => changeField(event, "phone-number")}
            onClick={(event) => clickField(event, "phone-number")}
            required
          />
          <label htmlFor="phone-number" className="label-add-item">
            {translate("phone-number", locale)}
          </label>
          <div className="invalid-feedback">
            {translate("please-enter-number", locale)}
          </div>
        </li>
        {/* Email Address */}
        <li className="input-field-add-item required-input">
          <input
            type="text"
            id="email"
            className="input-add-item form-control"
            onChange={(event) => changeField(event, "email")}
            onClick={(event) => clickField(event, "email")}
            required
          />
          <label htmlFor="email" className="label-add-item">
            {translate("email-address", locale)}
          </label>
          <div className="invalid-feedback">
            {translate("please-enter-email", locale)}
          </div>
        </li>
      </ul>

      {/* Step 2 */}
      <ul
        className="list-group list-group-flush list-add-item animate__animated animate__fadeIn"
        id="step-2-add-item-content"
        dir="ltr"
      >
        {/* Category */}
        <li className="input-field-add-item input-row-step2">
          <label htmlFor="select-category" className="label-step2">
            {translate("category", locale)}
          </label>
          <div className="select-col">
            <select
              className="select-add-item form-select form-control"
              aria-label="Default select example"
              id="select-category"
              onChange={(event) => changeField(event, "select-category")}
              onClick={(event) => clickField(event, "select-category")}
              required
            >
              <option value="not-selected-category">
                {translate("choose-category", locale)}
              </option>
              {AllCategories.length ? (
                AllCategories.sort((a, b) => {
                  if (a.strCategory < b.strCategory) return -1;
                  else return 1;
                }).map((categ, index) => {
                  return (
                    <option key={index} value={categ.strCategory}>
                      {categ.strCategory}
                    </option>
                  );
                })
              ) : (
                <option key={"noCategories"} value="noCategories">
                  no Categories
                </option>
              )}
            </select>

            <div className="invalid-feedback">
              {translate("please-select-cat", locale)}
            </div>
          </div>
        </li>
        {/* Type of drink */}
        <li className="input-field-add-item input-row-step2">
          <label htmlFor="drink" className="label-step2">
            {translate("type-of-drink", locale)}
          </label>
          <div className="select-col">
            <select
              className="select-add-item form-select form-control"
              aria-label="Default select example"
              id="drink"
              onChange={(event) => changeField(event, "drink")}
              onClick={(event) => clickField(event, "drink")}
              required
            >
              <option value="not-selected-type-drink">
                {translate("choose-type", locale)}
              </option>
              {AllTypes.length ? (
                AllTypes.sort((a, b) => {
                  if (a.strAlcoholic < b.strAlcoholic) return -1;
                  else return 1;
                }).map((type, index) => {
                  return (
                    <option key={index} value={type.strAlcoholic}>
                      {type.strAlcoholic}
                    </option>
                  );
                })
              ) : (
                <option key={"noTypes"} value="noTypes">
                  no Types
                </option>
              )}
            </select>

            <div className="invalid-feedback">
              {translate("please-select-type", locale)}
            </div>
          </div>
        </li>
        {/* Type of glass */}
        <li className="input-field-add-item input-row-step2">
          <label htmlFor="glass" className="label-step2">
            {translate("type-of-glass", locale)}
          </label>
          <div className="select-col">
            <select
              className="select-add-item form-select form-control"
              aria-label="Default select example"
              id="glass"
              onChange={(event) => changeField(event, "glass")}
              onClick={(event) => clickField(event, "glass")}
              required
            >
              <option value="not-selected-type-glass">
                {translate("choose-type", locale)}
              </option>
              {AllGlasses.length ? (
                AllGlasses.sort((a, b) => {
                  if (a.strGlass < b.strGlass) return -1;
                  else return 1;
                }).map((glass, index) => {
                  return (
                    <option key={index} value={glass.strGlass}>
                      {glass.strGlass}
                    </option>
                  );
                })
              ) : (
                <option key={"noGlasses"} value="noGlasses">
                  no Glasses
                </option>
              )}
            </select>

            <div className="invalid-feedback">
              {translate("please-select-type", locale)}
            </div>
          </div>
        </li>
        {/* Ingredients */}
        <li className="input-field-add-item input-row-step2">
          <label htmlFor="ingredients" className="label-step2">
            {translate("ingredients", locale)}
          </label>
          <div className="select-col">
            <select
              className="select-add-item form-select form-control"
              aria-label="Default select example"
              id="ingredients"
              onChange={(event) => changeField(event, "ingredients")}
              onClick={(event) => clickField(event, "ingredients")}
              required
            >
              <option value="not-selected-ingredient">
                {translate("choose-ingredients", locale)}
              </option>
              {AllIngredients.length ? (
                AllIngredients.sort((a, b) => {
                  if (a.strIngredient1 < b.strIngredient1) return -1;
                  else return 1;
                }).map((ingredient, index) => {
                  return (
                    <option key={index} value={ingredient.strIngredient1}>
                      {ingredient.strIngredient1}
                    </option>
                  );
                })
              ) : (
                <option key={"noIngredients"} value="noIngredients">
                  no Ingredients
                </option>
              )}
            </select>

            <div className="invalid-feedback">
              {translate("please-select-ingredients", locale)}
            </div>
          </div>
        </li>
        <div className="ingredients-selected-list">
          {Ingredients !== "not-selected-ingredient" ? (
            Ingredients.map((ing, index) => {
              return (
                <div
                  key={index}
                  onClick={() => RemoveIngredient(index)}
                  className="button-ing"
                >
                  <div className="button-wrapper">
                    <div className="text">{ing}</div>
                    <span className="icon-ing">X</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="ingredients-not-selected">
              {translate("ingredients-not-selected", locale)}
            </div>
          )}
        </div>
      </ul>

      {/* Step 3 */}
      <ul
        className="list-group list-group-flush list-add-item animate__animated animate__fadeIn"
        id="step-3-add-item-content"
        dir="ltr"
      >
        <li className="input-field-add-item row-review-step">
          <label htmlFor="type" className="review-label">
            {translate("name-of-cocktail-bar", locale)}
          </label>
          <span>{NameCocktailBar}</span>
        </li>
        <hr />
        <li className="input-field-add-item row-review-step">
          <label htmlFor="type" className="review-label">
            {translate("first-name-of-owner", locale)}
          </label>
          <span>{FirstNameOwner}</span>
        </li>
        <hr />
        <li className="input-field-add-item row-review-step">
          <label htmlFor="type" className="review-label">
            {translate("last-name-of-owner", locale)}
          </label>
          <span>{LastNameOwner}</span>
        </li>
        <hr />
        <li className="input-field-add-item row-review-step">
          <label htmlFor="type" className="review-label">
            {translate("phone-number", locale)}
          </label>
          <span>{PhoneNumber}</span>
        </li>
        <hr />
        <li className="input-field-add-item row-review-step">
          <label htmlFor="type" className="review-label">
            {translate("email-address", locale)}
          </label>
          <span>{EmailAddress}</span>
        </li>
        <hr />
        <li className="input-field-add-item row-review-step">
          <label htmlFor="type" className="review-label">
            {translate("category", locale)}
          </label>
          <span>{Category}</span>
        </li>
        <hr />
        <li className="input-field-add-item row-review-step">
          <label htmlFor="type" className="review-label">
            {translate("type-of-drink", locale)}
          </label>
          <span>{DrinkType}</span>
        </li>
        <hr />
        <li className="input-field-add-item row-review-step">
          <label htmlFor="type" className="review-label">
            {translate("type-of-glass", locale)}
          </label>
          <span>{GlassType}</span>
        </li>
        <hr />
        <li className="input-field-add-item row-review-step">
          <label htmlFor="type" className="review-label">
            {translate("ingredients", locale)}
          </label>
          <span>{Ingredients.toString()}</span>
        </li>
      </ul>
    </div>
  );
}

export default MakingModal;
