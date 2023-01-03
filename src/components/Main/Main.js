import "./Main.css";
import { getTranslatedText as translate } from "../Localization/Translation";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useBetween } from "use-between";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import cocktail from "./cocktail.jpg";
import cocktail2 from "./cocktail2.jpg";
import MakingModal from "./MakingModal";
import Recommendation from "./Recommendation";

function Main() {
  const {
    locale,
    NameCocktailBar,
    FirstNameOwner,
    LastNameOwner,
    PhoneNumber,
    EmailAddress,
    Category,
    DrinkType,
    GlassType,
    Ingredients,
  } = useBetween(useSelector((state) => state.useSharedLang));
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const [showRecommendationsModal, setShowRecommendationsModal] =
    useState(false);
  const handleCloseRecommendationModal = () =>
    setShowRecommendationsModal(false);
  const handleShowRecommendationModal = () => {
    setShowRecommendationsModal(true);
  };

  const switchBackStep = () => {
    var currentStepId = document.getElementsByClassName("current-item")[0].id; // current step tab

    var backStepId; // back step tab
    var backStepContentId; // back step content tab
    var currentStepContentId; // current step content tab
    if (currentStepId === "step-1-add-item-bar") {
      currentStepContentId = "step-1-add-item-content";
      backStepId = "step-1-add-item-bar";
      backStepContentId = "step-1-add-item-content";

      handleClose();
    } else if (currentStepId === "step-2-add-item-bar") {
      currentStepContentId = "step-2-add-item-content";
      backStepId = "step-1-add-item-bar";
      backStepContentId = "step-1-add-item-content";

      document.getElementById("back-btn-add-item").textContent = translate(
        "close-btn",
        locale
      );
    } else if (currentStepId === "step-3-add-item-bar") {
      currentStepContentId = "step-3-add-item-content";
      backStepId = "step-2-add-item-bar";
      backStepContentId = "step-2-add-item-content";
      document.getElementById("next-btn-add-item").textContent = translate(
        "next-btn",
        locale
      );
    }
    document.getElementById(currentStepId).classList.remove("current-item"); // remove current step tab
    document
      .getElementById(currentStepContentId)
      .classList.remove("current-list"); // remove current step content tab

    document.getElementById(backStepId).classList.add("current-item"); // switch to back step tab
    document.getElementById(backStepContentId).classList.add("current-list"); // switch to back step content tab
  };
  const switchNextStep = () => {
    var currentStepId = document.getElementsByClassName("current-item")[0].id; // current step tab
    checkAddItem(currentStepId);
  };

  const switchStepsBlocks = (
    currentStep,
    currentStepContentId,
    nextStepId,
    nextStepContentId
  ) => {
    document.getElementById(currentStep).classList.remove("current-item"); // remove current step tab
    document
      .getElementById(currentStepContentId)
      .classList.remove("current-list"); // remove current step content tab

    document.getElementById(nextStepId).classList.add("current-item"); // switch to next step tab
    document.getElementById(nextStepContentId).classList.add("current-list"); // switch to next step content tab

    document.getElementById("back-btn-add-item").textContent = translate(
      "back-btn",
      locale
    );
  };
  const checkAddItem = (currentStep) => {
    var nextStepId; // next step tab
    var nextStepContentId; // next step content tab
    var currentStepContentId; // current step content tab
    if (currentStep === "step-1-add-item-bar") {
      if (NameCocktailBar === "") {
        // =====> ERROR
        document
          .getElementById("name-cocktail-bar")
          .classList.add("is-invalid");
      }
      if (FirstNameOwner === "") {
        // =====> ERROR
        document.getElementById("first-name-owner").classList.add("is-invalid");
      }
      if (LastNameOwner === "") {
        // =====> ERROR
        document.getElementById("last-name-owner").classList.add("is-invalid");
      }
      if (PhoneNumber === "") {
        // =====> ERROR
        document.getElementById("phone-number").classList.add("is-invalid");
      }
      if (EmailAddress === "") {
        // =====> ERROR
        document.getElementById("email").classList.add("is-invalid");
      }
      if (
        NameCocktailBar !== "" &&
        FirstNameOwner !== "" &&
        LastNameOwner !== "" &&
        PhoneNumber !== "" &&
        EmailAddress !== ""
      ) {
        currentStepContentId = "step-1-add-item-content";
        nextStepId = "step-2-add-item-bar";
        nextStepContentId = "step-2-add-item-content";

        switchStepsBlocks(
          currentStep,
          currentStepContentId,
          nextStepId,
          nextStepContentId
        );
      }
    } else if (currentStep === "step-2-add-item-bar") {
      if (Category === "not-selected-category") {
        // =====> ERROR
        document.getElementById("select-category").classList.add("is-invalid");
      }
      if (DrinkType === "not-selected-type-drink") {
        // =====> ERROR
        document.getElementById("drink").classList.add("is-invalid");
      }
      if (GlassType === "not-selected-type-glass") {
        // =====> ERROR
        document.getElementById("glass").classList.add("is-invalid");
      }
      if (Ingredients === "not-selected-ingredient") {
        // =====> ERROR
        document.getElementById("ingredients").classList.add("is-invalid");
      }
      if (
        Category !== "not-selected-category" &&
        DrinkType !== "not-selected-type-drink" &&
        GlassType !== "not-selected-type-glass" &&
        Ingredients !== "not-selected-ingredient"
      ) {
        currentStepContentId = "step-2-add-item-content";
        nextStepId = "step-3-add-item-bar";
        nextStepContentId = "step-3-add-item-content";
        document.getElementById("next-btn-add-item").textContent = translate(
          "show-recommendations-btn",
          locale
        );

        switchStepsBlocks(
          currentStep,
          currentStepContentId,
          nextStepId,
          nextStepContentId
        );
      }
    } else if (currentStep === "step-3-add-item-bar") {
      currentStepContentId = "step-3-add-item-content";
      nextStepId = "step-1-add-item-bar";
      nextStepContentId = "step-1-add-item-content";
      handleClose();

      switchStepsBlocks(
        currentStep,
        currentStepContentId,
        nextStepId,
        nextStepContentId
      );
      handleShowRecommendationModal();
    }
  };

  return (
    <div className="Main">
      <div className="Main-container row">
        <div className="col">
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={cocktail}
                  className="d-block slider-pictures"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src={cocktail2}
                  className="d-block slider-pictures"
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="text-col col">
          <div className="animate__animated animate__lightSpeedInLeft">
            {translate("first-line-main", locale)}
          </div>
          <div className="animate__animated animate__lightSpeedInLeft animate__delay-1s">
            {translate("second-line-main", locale)}
          </div>
          <div className="animate__animated animate__lightSpeedInLeft animate__delay-2s">
            {translate("third-line-main", locale)}
          </div>
          <button
            className="cssbuttons-io-button animate__animated animate__pulse animate__infinite animate__delay-3s"
            onClick={handleShow}
          >
            {" "}
            {translate("get-started-main", locale)}
            <div className="icon">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Making Modal */}
      <Modal show={show} onHide={handleClose} size="md" dir="auto">
        <Modal.Header className="modal-header">
          <span>{translate("make-your-cocktail-header", locale)}</span>
        </Modal.Header>
        <Modal.Body>
          <MakingModal />
        </Modal.Body>
        <Modal.Footer dir="auto">
          <Button
            variant="primary"
            className="btn btn-secondary"
            onClick={switchBackStep}
            id="back-btn-add-item"
          >
            {translate("close-btn", locale)}
          </Button>
          <Button
            variant="primary"
            className="btn btn-modal"
            onClick={switchNextStep}
            id="next-btn-add-item"
          >
            {translate("next-btn", locale)}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Recommendation */}
      <Modal
        show={showRecommendationsModal}
        onHide={handleCloseRecommendationModal}
        size="md"
        dir="auto"
      >
        <Modal.Header className="modal-header">
          <span>{translate("recommendations-header", locale)}</span>
        </Modal.Header>
        <Modal.Body>
          <Recommendation />
        </Modal.Body>
        <Modal.Footer dir="auto">
          <Button
            variant="primary"
            className="btn btn-secondary"
            onClick={handleCloseRecommendationModal}
            id="close-recommend"
          >
            {translate("close-btn", locale)}
          </Button>
          <Button
            variant="primary"
            className="btn btn-modal"
            onClick={handleCloseRecommendationModal}
            id="ok-recommend"
          >
            {translate("ok-btn", locale)}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Main;
