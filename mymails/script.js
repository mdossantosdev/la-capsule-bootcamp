const UIController = (() => {
  const DOMstrings = {
    count: 'count',
    trash: 'trash'
  }

  return {
    displayCount: () => {
      document.getElementById(DOMstrings.count).textContent = document.getElementsByTagName('p').length;
    },

    deleteItem: (event) => {
      event.target.parentNode.remove();
    },

    getDOMstrings: () => {
      return DOMstrings;
    }
  }

})();

const controller = ((UICtrl) => {

  const setupEventListeners = () => {
    const DOM = UICtrl.getDOMstrings();

    for (const element of document.getElementsByClassName(DOM.trash)) {
      element.addEventListener('click', ctrlDeleteItem);
    }
  };

  const ctrlDeleteItem = (e) => {
    UICtrl.deleteItem(e);
    UICtrl.displayCount();
  };

  return {
    init: () => {
      console.log('My Mails App has started.')
      UICtrl.displayCount();
      setupEventListeners();
    }
  }

})(UIController);

controller.init();
