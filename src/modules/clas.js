// ? Class ------------------------------------------------------------

function clas() {
  class menuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parentSelector = document.querySelector(parentSelector);
      this.transfer = 11700;
      this.changeToUZS();
    }

    changeToUZS() {
      this.price *= this.transfer;
    }

    render() {
      const card = document.createElement("div");

      if (this.classes.length === 0) {
        card.classList.add("menu__item");
      } else {
        this.classes.forEach((className) => card.classList.add(className));
      }

      card.innerHTML = `
              <img src="${this.src}" alt="${this.alt}" />
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Price:</div>
                  <div class="menu__item-total"><span>${this.price}so'm</span> month</div>
              </div>
          `;

      this.parentSelector.append(card);
    }
  }

  axios.get('http://localhost:3000/menu').then(data => {
    data.data.forEach(({src, alt, title, descr, price}) => {
      new menuCard(src, alt, title, descr, price, ".menu .container").render();
    })
  })
}

export default clas