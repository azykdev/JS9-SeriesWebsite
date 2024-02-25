function tab() {
  // ? Tabs ------------------------------------------------------------

  let tabheader__items = document.querySelector(".tabheader__items"),
  tabheader__item = document.querySelectorAll(".tabheader__item"),
  tabcontent = document.querySelectorAll(".tabcontent");



  function hideTabContent() {
  tabcontent.forEach((item) => {
    item.classList.add("hide");
    item.classList.remove("show", "fade");
  });

  tabheader__item.forEach((item) => {
    item.classList.remove("tabheader__item_active");
  });
  }
  hideTabContent();

  function showTabContent(i) {
  tabcontent[i].classList.add("show", "fade");
  tabcontent[i].classList.remove("hide");
  tabheader__item[i].classList.add("tabheader__item_active");
  }
  showTabContent(0);

  tabheader__items.addEventListener("click", (e) => {
    let target = e.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabheader__item.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

}

export default tab