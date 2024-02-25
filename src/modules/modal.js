// ? Modal ------------------------------------------------------------
function showModal(modalSelector, modalTimerId) {
  let modal = document.querySelector(modalSelector)
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  console.log(modalTimerId);
  if (modalTimerId) {
    clearTimeout(modalTimerId);
  }
}

function hideModal(modalSelector) {
  let modal = document.querySelector(modalSelector)
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {

  let modal = document.querySelector(modalSelector),
  modalTrigger = document.querySelectorAll(triggerSelector);

  

  modalTrigger.forEach((item) => {
    item.addEventListener("click", () => {
      showModal(modalSelector, modalTimerId);
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target == modal || e.target.getAttribute("data-close") == "") {
      hideModal(modalSelector);
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      hideModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      showModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);

  // ! For example
  // setInterval(() => {
  //     console.log('----------');
  //     console.log(window.scrollY);
  //     console.log(window.pageYOffset);
  //     console.log(document.documentElement.scrollTop);
  //     console.log(document.documentElement.clientHeight);
  //     console.log(document.documentElement.scrollHeight);
  // },  10000)
}

export default modal
export {showModal, hideModal}