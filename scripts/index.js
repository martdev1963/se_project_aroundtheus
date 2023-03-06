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
const profileEditButton = document.querySelector("#profile-edit-button"); // loc:35 in html loc:177 in js
const profileEditModal = document.querySelector("#profile-edit-modal"); // the popup for editing profile loc:58 in html
//const modalCloseButton = document.querySelector("#modal-close-button");
const profileCloseButton = document.querySelector("#modal-close-button"); // loc:60 in html
const profileName = document.querySelector("#profile-name");
const profileJobTitle = document.querySelector("#profile-job-title");
const profileNameInput = document.querySelector("#profile-name-input");
const profileJobInput = document.querySelector("#profile-job-input");
const profileEditForm = document.querySelector("#profile-edit-form"); // loc:64 in html

// card
const cardAddModal = document.querySelector("#card-add-modal"); // loc:84 html element...the popup for adding a new card
const cardCloseButton = cardAddModal.querySelector("#card-add-close"); //selecting child:loc:87 from parent container loc:86 in html
const cardAddButton = document.querySelector("#profile-button"); // loc:44 in profile <section> html...see comment in loc:41 in html
const cardTitle = document.querySelector("#card-title"); // h2 element in template loc:124
const cardImage = document.querySelector("#card-image"); // img element in template
const cardTitleInput = document.querySelector("#card-title-input");
const cardImageInput = document.querySelector("#card-image-input");
const cardListElement = document.querySelector(".cards__list"); // <ul class="cards__list"> populated dynamically

const cardModalImage = document.querySelector("#card-modal-image");

// extract content from <template> look at function getCardView(cardData) definition @ loc:97
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardAddForm = cardAddModal.querySelector("#card-add-form"); //selecting child loc:90 from parent container loc:87
const cardImageModal = document.querySelector("#card-image-modal"); // parent div loc:117 in html the 'blown up' card
const modalImage = document.querySelector("#card-modal-image"); // loc:114 in html for 'blown up' card
const modalCaption = document.querySelector("#card-modal-caption"); // loc:115 in html loc:168 in function handleCardImageModal()
const cardImageModalClose = document.querySelector("#card-image-close"); // loc:116 in html close button for 'blown up' card

//code for closing modals by clicking overlay
//const modalPopups = document.querySelectorAll(".modal");
const modalContainerCard = document.querySelector(".modal__container-card");
/**
 * -----------------
 *     Functions
 * -----------------
 */

// PROJECT 6 OVERVIEW | JOSH Video: 38:37 / 55:42
// handler which calls the isEscEvent() function
// this is SPRINT 6: STEP 4 "closing popup with Esc"

// keycode for esc key
const ESC_KEYCODE = 27;

// for clicking on ESC key to close modal forms...
const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closePopUp);
};

// for clicking/mousedown on Overlay...outside of modal forms to close them...STEP 3
const handleOverlayClick = (evt) => {
  evt.preventDefault();
  isOverlayClicked(evt, closePopUp);
};

const isEscEvent = (evt, action) => {
  const activePopup = document.querySelector(".modal_opened");
  if (evt.which === ESC_KEYCODE) {
    action(activePopup);
    console.log("loc:94 isEscEvent arrow function code was executed..."); // debugging code...
    console.log(
      "Contains all elements in body tag:which are other places where you can click for closing modal",
      evt.target
    ); // debugging code...
  }
};

// Both closePopUp() and openPopUp() functions are used to open two different modal forms...the profile edit and the add new card modal
function closePopUp(popUp) {
  // uses the parameter popUp, making it more transparent and not for just one specific element.
  popUp.classList.remove("modal_opened"); // removes boolean modifier class from the box modal
  /* add code here to remove EvenListener that will be added in loc:88 below in openPopUp()*/
  document.removeEventListener("keyup", handleEscUp); //this is SPRINT 6: STEP 4 "closing popup with Esc" loc:85
}

function openPopUp(popUp) {
  popUp.classList.add("modal_opened"); // adds boolean modifier class to the box modal check loc:19 in css: .modal_opened
  /* add code here for closing modal popup with escape key */
  //this is SPRINT 6: STEP 4 "closing popup with Esc"
  document.addEventListener("keyup", handleEscUp); //<------handler function to call...
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
function closeProfileEditModal(evt) {
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
  console.log("Edit Form Modal was opened! "); // debugging code...
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
  console.log("This is the Card Data ", cardData); // debugging code...
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
  // see loc:44 in html and loc:55 in js for "deceptively" named: #profile-button(BEM) associated with cardAddButton variable
  // for adding new card with image and title
  openPopUp(cardAddModal); // opens the form loc:83 in html
});

// click event is obviously specific only to mouse and not the enter key.
profileCloseButton.addEventListener("click", closeProfileEditModal); // solves bug on 'reading remove' for undifined element. see loc:45 in js file

// code for closing profile Edit modal form if clicked outside of modal form...(profileEditModal) "#profile-edit-modal"
profileEditModal.addEventListener("mousedown", (evt) => {
  if (evt.currentTarget.classList.contains("modal")) {
    closeProfileEditModal();
    console.log("profileEditModal eventlistener got called!");
  }
});

// code for closing cardAddModal "#card-add-modal" using 'mousedown' when clicking on Overlay
cardAddModal.addEventListener("mousedown", (evt) => {
  if (evt.currentTarget.classList.contains("modal")) {
    closePopUp(cardAddModal);
    console.log("cardAddModal eventlistener got called!");
  }
});

// code for closing modalImage #card-modal-image" using 'mousedown' when clicking on Overlay
//modalContainerCard.addEventListener("mousedown", (evt) => {
//  if (evt.currentTarget.classList.contains("modal")) {
//    closePopUp(modalContainerCard);
//    console.log("modalContainerCard eventlistener got called!");
//  }
//});

//Good coding practice: Submit handlers are added only to form tags with event submit rather than to submit buttons with event click because it also automatically handles Enter presses
profileEditForm.addEventListener("submit", handleProfileEditSubmit); // calls handleProfileEditSubmit at loc:157 which calls closePopUp(profileEditModal); see loc:43 in js file

cardCloseButton.addEventListener("click", (evt) => {
  closePopUp(cardAddModal); // closes the form loc:85 in html for adding new card loc:53 js file
  console.log("cardCloseButton got clicked", evt.target);
});

// the button featured in the 'blown up' card...see loc:70 in js & loc:116 in html
cardImageModalClose.addEventListener("click", () => {
  // closes 'blown up' card
  closePopUp(cardImageModal); // passing the popup modal form...
});

cardAddForm.addEventListener("submit", addCard); // render the card in the <ul> element dynamically...

initialCards.forEach((cardData) => {
  const cardView = getCardView(cardData);
  renderCard(cardView, cardListElement);
});
