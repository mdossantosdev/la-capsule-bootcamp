// UI Controller
const UIController = (() => {
  const DOMstrings = {
    container: 'container',
    count: 'count',
    searchBtn: 'search-btn',
    addBtn: 'add-btn',
    inputSearch: 'input-search',
    inputMsg: 'input-msg',
    trash: 'trash',
    isVisible: 'is-visible',
  };

  const fadeOut = (element) => {
    element.style.opacity = 1;

    (function fade() {
      if ((element.style.opacity -= 0.1) < 0) {
        element.style.display = 'none';
      } else {
        requestAnimationFrame(fade);
      }
    })();
  };

  const randomAvatar = () => {
    return Math.floor(Math.random() * 5 + 1);
  };

  const randomName = () => {
    const firstName = ['Tony', 'Bruce', 'Steve', 'Natasha', 'Pepper', 'Carol'];
    const lastName = [
      'Stark',
      'Banner',
      'Rogers',
      'Romanoff',
      'Potts',
      'Danvers',
    ];

    const index = () => Math.floor(Math.random() * firstName.length);

    return `${firstName[index()]} ${lastName[index()]}`;
  };

  return {
    getInput: () => {
      return {
        message: document.getElementById(DOMstrings.inputMsg).value,
      };
    },

    searchMsg: () => {
      const fields = document.getElementsByTagName('h6');
      const fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach((element) => {
        const searchValue = document.getElementById(DOMstrings.inputSearch).value.toLowerCase();

        if (searchValue.length > 0 && searchValue !== element.textContent.toLowerCase()) {
          element.parentNode.parentNode.classList.remove('is-visible');
          fadeOut(element.parentNode.parentNode);
        }
      });
    },

    displayCount: () => {
      document.getElementById(DOMstrings.count).textContent = document.getElementsByClassName(DOMstrings.isVisible).length;
    },

    addItem: () => {
      let html = `
        <div class="row new-last-row is-visible">
          <img class="avatar" src="images/avatar-${randomAvatar()}.jpg">
          <div class="content">
            <h6>${randomName()}</h6>
            <p>%message%</p>
          </div>
          <img class="trash" src="images/trash.png">
        </div>
      `;

      const input = document.getElementById(DOMstrings.inputMsg).value;

      const newHtml = html.replace('%message%', input);

      document.getElementById(DOMstrings.container).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteItem: (event) => {
      event.target.parentNode.remove();
    },

    clearField: (input) => {
      const field = document.getElementById(input);

      field.value = '';
    },

    getDOMstrings: () => {
      return DOMstrings;
    },
  };
})();

// Global App Controller
const controller = ((UICtrl) => {
  const DOM = UICtrl.getDOMstrings();

  const setupEventListeners = () => {
    document.getElementById(DOM.searchBtn).addEventListener('click', ctrlSearchMsg);

    document.getElementById(DOM.addBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') ctrlAddItem();
    });

    deleteEventListeners();
  };

  const ctrlSearchMsg = () => {
    // Search the message by user
    UICtrl.searchMsg();

    // Clear the field
    UICtrl.clearField(DOM.inputSearch);

    // Update the counter
    UICtrl.displayCount();
  };

  const deleteEventListeners = () => {
    for (const element of document.getElementsByClassName(DOM.trash)) {
      element.addEventListener('click', ctrlDeleteItem);
    }
  };

  const ctrlAddItem = () => {
    // Get the field input data
    const input = UICtrl.getInput();

    if (input.message !== '') {
      // Add the item to the UI
      UICtrl.addItem();

      deleteEventListeners();

      // Clear the field
      UICtrl.clearField(DOM.inputMsg);

      // Update the counter
      UICtrl.displayCount();
    }
  };

  const ctrlDeleteItem = (e) => {
    // Delete the item from the UI
    UICtrl.deleteItem(e);

    // Update the counter
    UICtrl.displayCount();
  };

  return {
    init: () => {
      console.log('My Mails App has started.');
      UICtrl.displayCount();
      setupEventListeners();
    },
  };
})(UIController);

controller.init();
