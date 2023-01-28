/**
 * ---------------------------
 *     Array of Objects
 * ---------------------------
 */
const initialCards = [
  (yosemiteObj = {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  }),
  (lakeLouiseObj = {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  }),
  (baldMountainsObj = {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  }),
  (LatemarObj = {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  }),
  (vanoiseNationalParkObj = {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  }),
  (lagoDiBraiesObj = {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  }),
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
const cardAddModal = document.querySelector("#card-add-modal");
const cardCloseButton = cardAddModal.querySelector("#card-add-close"); //selecting child from parent container
const cardAddButton = document.querySelector("#profile-button"); // loc:43 in profile <section> html
const cardTitle = document.querySelector("#card-title"); // h2 element in template
const cardImage = document.querySelector("#card-image"); // img element in template
const cardTitleInput = document.querySelector("#card-title-input");
const cardImageInput = document.querySelector("#card-image-input");
const cardListElement = document.querySelector(".cards__list"); // <ul class="cards__list"> populated dynamically

// extract content from <template> look at function  getCardView(cardData) definition @ loc:95
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
  console.log("called on clicking card-image-close");
}

function openPopUp(popUp) {
  popUp.classList.add("modal_opened"); // adds boolean modifier class to the box modal
}

function renderCard(cardElement, container) {
  //container parameter represents: cardListElement <ul>
  container.prepend(cardElement);
}

function deleteCard(e) {
  e.target.closest(".card").remove();
  console.log("function called from loc:110 event listener! ");
}

function getCardView(cardData) {
  // refer to loc: 61 cardTemplate variable...
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image"); // load cardElement with all data
  const cardTitleElement = cardElement.querySelector(".card__caption");
  const cardHeartLikeButton = cardElement.querySelector(".card__heart");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  /* ---- function getCardView() Event Listeners Begin ---- */
  cardHeartLikeButton.addEventListener("click", () => {
    cardHeartLikeButton.classList.toggle("card__heart_LikeButton_active");
  });

  cardDeleteButton.addEventListener("click", deleteCard); // delete card by clicking delete icon.

  cardImageElement.addEventListener("click", () => {
    // const cardImageElement representing the .card__image loc:99 js - loc:122 html
    handleCardImageModal(cardData); // this function (defined in loc:151) is called when clicking on card image
  });
  /* ----  function getCardView() Event Listeners End ---- */

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;
  return cardElement; // return cardElement which is a clone of the cardTemplate
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

function handleCardAddSubmit(e) {
  e.preventDefault();
  cardTitle.textContent = cardTitleInput.value; // cardTitle variable declared in loc:54
  cardImage.src = cardImageInput.value; // cardImage variable declared in loc:55
  cardImage.alt = cardImageInput.value;
  closePopUp(cardAddModal); // close the form element loc:83 in html file declared in loc:52 in js file
}

function deleteCard(e) {
  e.target.closest(".card").remove();
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

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJobTitle.textContent;
  openPopUp(profileEditModal);
});

cardAddButton.addEventListener("click", () => {
  openPopUp(cardAddModal); // opens the form loc:83 in html file
});

profileCloseButton.addEventListener("click", () => {
  closePopUp(profileEditModal); // profileEditModal, variable element for loc:57 in html (close form)
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardCloseButton.addEventListener("click", () => {
  closePopUp(cardAddModal); // closes the form loc:83 in html file
});

cardImageModalClose.addEventListener("click", () => {
  closePopUp(cardImageModal);
});

cardAddForm.addEventListener("submit", (e) => {
  //"#card-add-form" loc:87 in html
  // variable declared at loc:64 in js file
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardView = getCardView({ name, link }); // see loc:93 in js file... cardView contains cardElement.
  renderCard(cardView, cardListElement); // see loc:84 for renderCard() function definition
  closePopUp(cardAddModal);
  cardAddForm.reset(); // zero out the form fields.
}); // render the card in the <ul> element dynamically...

initialCards.forEach((cardData) => {
  const cardView = getCardView(cardData);
  renderCard(cardView, cardListElement);
});

// passing an anonymous function as 2nd parameter to addEventListener using arrow notation...
profileEditButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened"); // adds boolean modifier class to the box modal, making it dynamically appear...
});

profileCloseButton.addEventListener("click", closePopUp); // call closePopUp() function upon clicking modalCloseButton...
