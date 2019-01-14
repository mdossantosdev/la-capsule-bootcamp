// UI Controller
const UIController = (() => {
  const DOMstrings = {
    count: 'count',
    trash: 'trash',
    addButton: 'add-btn',
    inputMsg: 'input-msg',
    container: 'container',
  };

  return {
    getInput: () => {
      return {
        message: document.getElementById(DOMstrings.inputMsg).value,
      };
    },

    displayCount: () => {
      document.getElementById(DOMstrings.count).textContent = document.getElementsByTagName('p').length;
    },

    addItem: () => {
      let html = `
        <div class="row">
          <img class="avatar" src="images/avatar-1.jpg">
          <div class="content">
            <h6>Sherlock Holmes</h6>
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

    clearField: () => {
      const field = document.getElementById(DOMstrings.inputMsg);

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
    document.getElementById(DOM.addButton).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') ctrlAddItem();
    });

    deleteEventListeners();
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
      UICtrl.clearField();

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
