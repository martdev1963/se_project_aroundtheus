/**
 * ---------------------------
 *     Array of Objects
 * ---------------------------
 */
const initialCards = [
  // got rid of the variables per code review
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/**
 * ------------------------------------------------------
 *                  **Elements**
 * connectiing html elements to javaScript variables
 * ------------------------------------------------------
 */

// profile
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = document.querySelector("#modal-close-button");
const profileName = document.querySelector("#profile-name");
const profileJobTitle = document.querySelector("#profile-job-title");
const profileNameInput = document.querySelector("#profile-name-input");
const profileJobInput = document.querySelector("#profile-job-input");
const profileEditForm = document.querySelector("#profile-edit-form");

// card
const cardAddModal = document.querySelector("#card-add-modal");
const cardCloseButton = cardAddModal.querySelector("#card-add-close");
const cardAddButton = document.querySelector("#profile-button");
const cardTitle = document.querySelector("#card-title");
const cardImage = document.querySelector("#card-image");
const cardTitleInput = document.querySelector("#card-title-input");
const cardImageInput = document.querySelector("#card-image-input");
const cardListElement = document.querySelector(".cards__list");

const cardModalImage = document.querySelector("#card-modal-image");

// extract content from <template> look at function getCardView(cardData) definition @ loc:97
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardAddForm = cardAddModal.querySelector("#card-add-form");
const cardImageModal = document.querySelector("#card-image-modal");
const modalImage = document.querySelector("#card-modal-image");
const modalCaption = document.querySelector("#card-modal-caption");
const cardImageModalClose = document.querySelector("#card-image-close");

//code for closing modals by clicking overlay
const modalPopups = document.querySelectorAll(".modal");
const modalContainerCard = document.querySelector(".modal__container-card");
/**
 * -----------------
 *     Functions
 * -----------------
 */

// keycode for esc key
const ESC_KEYCODE = 27;

// for clicking on ESC key to close modal forms...(It now works)
const handleEscUp = (evt) => {
  evt.preventDefault();
  const activePopup = document.querySelector(".modal_opened");
  if (activePopup) {
    if (evt.which === ESC_KEYCODE) {
      closePopUp(activePopup);
    }
  }
};

// for clicking/mousedown on Overlay...outside of modal forms to close them...STEP 3
const handleOverlayClick = (evt) => {
  evt.preventDefault();
};

function closePopUp(popUp) {
  popUp.classList.remove("modal_opened"); // removes boolean modifier class from the box modal
  document.removeEventListener("keyup", handleEscUp); // use esc key
}

function openPopUp(popUp) {
  popUp.classList.add("modal_opened"); // adds boolean modifier class to the box modal check loc:19 in css: .modal_opened
  document.addEventListener("keyup", handleEscUp);
}

function renderCard(cardElement, container) {
  //container parameter represents: cardListElement <ul>
  container.prepend(cardElement);
}

// See LOC:109
function deleteCard(e) {
  e.target.closest(".card").remove(); // delete's card starting from last card
}

function getCardView(cardData) {
  // refer to loc: 61 cardTemplate variable...
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image"); // load cardElement with all data...these classes belong to the elements in the <template> element
  const cardTitleElement = cardElement.querySelector(".card__caption");
  const cardHeartLikeButton = cardElement.querySelector(".card__heart");
  const cardTrashButton = cardElement.querySelector("#card-Trash-button");
  /* ---- function getCardView() Event Listeners Begin ---- */
  cardHeartLikeButton.addEventListener("click", () => {
    cardHeartLikeButton.classList.toggle("card__heart_LikeButton_active");
  });

  cardTrashButton.addEventListener("click", deleteCard); // see LOC:93

  cardImageElement.addEventListener("click", () => {
    // const cardImageElement representing the .card__image loc:99 js - loc:122 html
    handleCardImageModal(cardData); // this function (defined in loc:151) is called when clicking on card image
  });
  /* ----  function getCardView() Event Listeners End ---- */

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;
  return cardElement; // return cardElement which is a clone of the cardTemplate
} // * getCardView() function definition END *

function addCard(e) {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardView = getCardView({ name, link });
  renderCard(cardView, cardListElement); // place card data into <ul> element
  closePopUp(cardAddModal);
  cardAddForm.reset();
  toggleButtonState(inputElements, submitButton, validationOptions);
}

// function declaration per code review with 'Could be improved' status
function closeProfileEditModal(evt) {
  closePopUp(profileEditModal);
}

// see loc:271 where this function is called from cardImageModalClose's addEventListener()
function closeCardImageModal(evt) {
  closePopUp(cardImageModal);
}

// created function to perform just one task per code review
function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJobTitle.textContent;
}

function openProfileForm() {
  fillProfileForm(); // fill the profile form fields
  openPopUp(profileEditModal); // profileEditModal, variable element for loc:57 in html (close form)
}

/**
 * -----------------------
 *     Event Handlers
 * -----------------------
 */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJobTitle.textContent = profileJobInput.value;
  closePopUp(profileEditModal);
}

function handleCardImageModal(cardData) {
  // link and name properties contained in parameter cardData which represents the card
  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  modalCaption.textContent = cardData.name; // loc:68 in js loc:115 in html
  openPopUp(cardImageModal); // see loc:67 in js and loc: 117 in html
}

/**
 * -----------------------
 *     Event Listeners
 * -----------------------
 */

// pops up profile edit modal form
profileEditButton.addEventListener("click", openProfileForm); // solves bug on 'reading add' for undifined element

// pops up add new card modal form
cardAddButton.addEventListener("click", () => {
  openPopUp(cardAddModal); // opens the form loc:83 in html
});

profileCloseButton.addEventListener("click", closeProfileEditModal);

// General 'mousedown' function handler for closing any modal

function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopUp(evt.target);
  }
}

profileEditModal.addEventListener("mousedown", closeModalOnRemoteClick);
cardAddModal.addEventListener("mousedown", closeModalOnRemoteClick);
cardImageModal.addEventListener("mousedown", closeModalOnRemoteClick);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardCloseButton.addEventListener("click", (evt) => {
  closePopUp(cardAddModal); // closes the form loc:85 in html for adding new card loc:53 js file
});

// see loc:182 for closeCardImageModal() function definition
cardImageModalClose.addEventListener("click", closeCardImageModal);

cardAddForm.addEventListener("submit", addCard); // render the card in the <ul> element dynamically...

initialCards.forEach((cardData) => {
  const cardView = getCardView(cardData);
  renderCard(cardView, cardListElement);
});
