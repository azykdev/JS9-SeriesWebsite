import { showModal, hideModal } from "./modal";
// ? FORM ------------------------------------------------------------

function form() {
  const forms = document.querySelectorAll("form");
  const message = {
    loading: "../img/spinner.svg",
    success: "Ma'lumot yuborildi :)",
    failure: "Xatolik yuz berdi :(",
  };

  forms.forEach((form) => {
    BindPostData(form);
  });

  async function postData(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: data,
    })

    return await res.json()
  }

  function BindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const loading = document.createElement("img");
      loading.src = message.loading;
      loading.style.cssText = `
              display: block;
              margin: 0 auto;
              width: 60px;
          `;
      form.insertAdjacentElement("afterend", loading);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()))

      postData('http://localhost:3000/request', json)
        .then((data) => {
          console.log(data);
          showMessageModal(message.success);
          loading.remove();
        })
        .catch(() => showMessageModal(message.failure))
        .finally(() => form.reset());
    });
  }


  function showMessageModal(msg) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");

    showModal();

    const messageModal = document.createElement("div");
    messageModal.classList.add("modal__dialog");
    messageModal.innerHTML = `
          <div class="modal__content">
              <div data-close class="modal__close">&times;</div>
              <div class="modal__title">${msg}</div>
          </div>
      `;
    modal.append(messageModal);

    setTimeout(() => {
      messageModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      hideModal();
    }, 3000);
  }

}

export default form