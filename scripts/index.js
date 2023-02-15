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
//const modalCloseButton = document.querySelector("#modal-close-button");
const profileCloseButton = document.querySelector("#modal-close-button");
const profileName = document.querySelector("#profile-name");
const profileJobTitle = document.querySelector("#profile-job-title");
const profileNameInput = document.querySelector("#profile-name-input");
const profileJobInput = document.querySelector("#profile-job-input");
const profileEditForm = document.querySelector("#profile-edit-form");

// card
const cardAddModal = document.querySelector("#card-add-modal"); // loc:83 html element
const cardCloseButton = cardAddModal.querySelector("#card-add-close"); //selecting child from parent container
const cardAddButton = document.querySelector("#profile-button"); // loc:43 in profile <section> html
const cardTitle = document.querySelector("#card-title"); // h2 element in template loc:124
const cardImage = document.querySelector("#card-image"); // img element in template
const cardTitleInput = document.querySelector("#card-title-input");
const cardImageInput = document.querySelector("#card-image-input");
const cardListElement = document.querySelector(".cards__list"); // <ul class="cards__list"> populated dynamically

// extract content from <template> look at function  getCardView(cardData) definition @ loc:96
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardAddForm = cardAddModal.querySelector("#card-add-form"); //selecting child loc:87 from parent container loc:83
const cardImageModal = document.querySelector("#card-image-modal"); // parent div loc:108 in html
const modalImage = document.querySelector("#card-modal-image");
const modalCaption = document.querySelector("#card-modal-caption");
const cardImageModalClose = document.querySelector("#card-image-close");

/**
 * -----------------
 *     Functions
 * -----------------
 */

function closePopUp(popUp) {
  // uses the parameter popUp, making it more transparent and not for just one specific element.
  popUp.classList.remove("modal_opened"); // removes boolean modifier class from the box modal
}

function openPopUp(popUp) {
  popUp.classList.add("modal_opened"); // adds boolean modifier class to the box modal
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

// function for adding a card - per code review
function addCard(e) {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardView = getCardView({ name, link });
  renderCard(cardView, cardListElement); // place card data into <ul> element
  closePopUp(cardAddModal);
  cardAddForm.reset();
}

// function declaration per code review with 'Could be improved' status
function closeProfileEditModal() {
  closePopUp(profileEditModal);
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
  modalCaption.textContent = cardData.name;
  openPopUp(cardImageModal); // see loc:66 in js and loc: 108 in html
}

/**
 * -----------------------
 *     Event Listeners
 * -----------------------
 */

profileEditButton.addEventListener("click", openProfileForm); // solves bug on 'reading add' for undifined element

cardAddButton.addEventListener("click", () => {
  // for adding new card with image and title
  openPopUp(cardAddModal); // opens the form loc:83 in html file
});

profileCloseButton.addEventListener("click", closeProfileEditModal); // solves bug on 'reading remove' for undifined element

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardCloseButton.addEventListener("click", () => {
  closePopUp(cardAddModal); // closes the form loc:83 in html file
});

cardImageModalClose.addEventListener("click", () => {
  closePopUp(cardImageModal);
});

cardAddForm.addEventListener("submit", addCard); // render the card in the <ul> element dynamically...

initialCards.forEach((cardData) => {
  const cardView = getCardView(cardData);
  // find .card__image
  const imageEl = cardView.querySelector(".card__image");
  const cardCaption = cardView.querySelector(".card__caption");

  // replace image src
  //imageEl.src = cardData.link;
  // replace image alt
  //imageEl.alt = cardData.name;

  // replace card-title
  //cardTitle.textContent = cardData.name;

  console.log(imageEl); // for debugging...
  console.log(cardCaption);
  renderCard(cardView, cardListElement);
});
