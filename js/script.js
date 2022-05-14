var htmlTemplate = `
<div class="click">
  <button type='submit' class='btn'>bắt đầu</button>
</div>
`;

const wait = (time) => new Promise((obj) => setTimeout(obj, time));

autoClick();

// setTimeout(() => {
//   const main = document.querySelector(".main");
//   main.innerHTML += htmlTemplate;
// }, 10000);

async function autoClick() {
  await wait(10000);
  let advertiserAccount = document.querySelector(
    ".byted-menu :nth-child(3) .bui-menu-ul :nth-child(1)"
  );
  advertiserAccount.click();
  await wait(2000);
  let addAccount = document.querySelector(".add-ad-account .vi-button");
  addAccount.click();
  await wait(2000);
  let createNew = document.querySelector(".vi-tooltip");
  createNew.click();
  await wait(2000);
  let buttonNext = document.querySelector(".dialog-footer :nth-child(2)");
  buttonNext.click();
  await wait(2000);
  createInformation();
  await wait(2000);
  const submit = document.querySelector(
    ".vi-dialog__wrapper .vi-dialog__footer .dialog-footer :nth-child(2)"
  );
  submit.addEventListener("submit", () => {
    console.log("ok");
  });
}

const createInformation = async () => {
  let response = await fetch("http://localhost:3000/data");
  let data = await response.json();
  const inputCompany = document.querySelector(
    `.vi-form div :nth-child(1) .vi-input input`
  );

  const inputIndustries = document.querySelector(
    ".vi-form div :nth-child(2) .vi-cascader .vi-input"
  );
  const inputNation = document.querySelector(
    ".vi-form div :nth-child(3) .vi-input"
  );
  const inputName = document.querySelector(
    ".vi-form div :nth-child(5) .vi-input"
  );

  const inputTimezone = document.querySelector(
    ".vi-form div :nth-child(6) .vi-input"
  );
  const inputWebsite = document.querySelector(
    ".vi-form div :nth-child(7) .vi-input"
  );

  Object.keys(data).forEach((key) => {
    let itemObj = data[key];
    let name = itemObj.accountPrefix + " " + itemObj.accountSuffix;
    setTimeout(() => {
      inputCompany.click();
    }, 2000);
    inputName.addEventListener("click", function () {
      document.execCommand("insertText", true, name);
    });
    inputWebsite.addEventListener("click", function () {
      document.execCommand("insertText", true, itemObj.website);
    });

    renderNation(itemObj.nation, inputNation);
  });
};

const renderNation = (data, obj) => {
  let nation = document.querySelector(
    ".vi-form div :nth-child(3) .vi-select .vi-select-dropdown"
  );
  let nationVal = nation.querySelectorAll("span");
  for (let i = 0; i < nationVal.length; i++) {
    const element = nationVal[i];
    if (element.outerText == data) {
      const div = element.parentElement;
      obj.addEventListener("click", function () {
        document.execCommand("insertText", true, data);
      });
      div.classList.add("selected");
      div.classList.add("hover");
    }
  }
  console.log(data);
};
