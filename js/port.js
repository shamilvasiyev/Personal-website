const row = document.querySelector(".row");

const data = [];

const fetchDataHandler = async () => {
  try {
    const response = await fetch("../data.json");
    const responseData = await response.json();
    data.push(responseData);

    const uiContent = responseData.map((item) => {
      return `
      <div class="col-md-12 big_box">
        <div class="main_item_box">
          <div class="h6_box"><h6>${item.title}</h6></div>
          <div class="img_box">
            <img src="${item.images[0]}" alt="${item.description}" />
          </div>
          <div class="text_box">
            <p>
              ${item.description}
            </p>
            <button id="${item.id}" class="button"><p>Ətraflı</p></button>
          </div>
        </div>
      </div>
    `;
    });

    row.insertAdjacentHTML("afterend", uiContent);

    const buttons = document.querySelectorAll(".button");

    Array.from(buttons).forEach((btn) => {
      btn.addEventListener("click", openModal);
    });
  } catch (error) {
    console.log(error);
  }
};

fetchDataHandler();

function openModal() {
  const modalId = data[0].find((d) => d.id == this.id);

  if (modalId) {
    const modalContent = `
          <div id="${modalId.id}" class="modal" style="display: block">
          <div class="modal_content">
            <div class="modal_header">
              <span class="close">&times;</span>
              <p>${modalId.title}</p>
            </div>
            <div class="modal_body">
              <div class="modal_img">
              ${modalId.images.map(
                (img) => `<img src="${img}" alt="poster dizayn" />`
              )}
              </div>
              <div class="modal_text">
                <p>
                  ${modalId.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        `;

    row.insertAdjacentHTML("afterend", modalContent);

    closeModal();

    window.addEventListener("click", outsideClick);
  }
}

const closeModal = () => {
  const closeBtn = document.querySelector(".close");

  closeBtn.addEventListener("click", function closeModalHandler() {
    closeBtn.parentElement.parentElement.parentElement.style.display = "none";
  });
};

const outsideClick = (e) => {
  const modal = document.querySelector(".modal");

  if (e.target == modal) {
    modal.style.display = "none";
  }
};
