const DropDown = (array) => {
  let buttonBindings = [];

  let buttonArray = array;
  let isFormat = false;

  let dropdown;
  let canToggleMenu = false;
  let hoverColor = '#3636ff';

  let whiteListedButtons = [];

  const createButtonTemplate = (template) => {
    const button = document.createElement('div');
    button.setAttribute('class', 'button');
    button.textContent = template.button;

    return button;
  };

  const getAdressByName = (name) => {
    const button = buttonArray.filter(
      (template) => template.button === name
    )[0];
    if (button.link) {
      return button.link;
    }
    return false;
  };
  const activateLink = (event) => {
    const adress = getAdressByName(event.target.textContent);
    const link = document.createElement('a');
    link.setAttribute('href', adress);
    link.click();
    link.remove();
  };

  const createDropDownElement = () => {
    const dropDownTemplate = document.createElement('div');
    dropDownTemplate.setAttribute('class', 'dropdown');
    dropDownTemplate.setAttribute('isTarget', '2');
    dropdown = dropDownTemplate;

    return dropdown;
  };

  const assignStyleToElement = (styleKey, element) => {
    const styleElement = element;
    const styles = currentStyleTemplate;

    const keys = Object.keys(styles[styleKey]);

    keys.forEach((key) => {
      styleElement.style[key] = styles[styleKey][key];
    });
  };

  const applyStyles = (element) => {
    if (element.getAttribute('class') === 'dropdown') {
      assignStyleToElement('dropdown', element);
      const buttonChildren = Array.from(element.children);

      buttonChildren.forEach((button) => {
        const links = Array.from(button.children);
        assignStyleToElement('button', button);
        links.forEach((link) => {
          assignStyleToElement('buttonLink', link);
        });
      });
    }
  };

  const addBindings = (elements, func, binding) => {
    if (!Array.isArray(elements)) elements.addEventListener(binding, func);
    else elements.forEach((element) => element.addEventListener(binding, func));
  };

  const removeBindings = (elements, func, binding) => {
    if (!Array.isArray(elements)) elements.removeEventListener(binding, func);
    else
      elements.forEach((element) => element.removeEventListener(binding, func));
  };

  const triggerAnimation = () => {
    let scale = 'scale(1)';
    canToggleMenu = !canToggleMenu;
    if (!canToggleMenu) scale = 'scale(0)';

    dropdown.style.pointerEvents = 'none';
    window.setTimeout(() => {
      dropdown.style.transform = scale;
    }, 1);
    window.setTimeout(() => {
      dropdown.style.pointerEvents = 'auto';
    }, 300);
  };

  const changeWhiteListBindings = () => {
    buttonBindings = buttonBindings.map((binding) => {
      const currentBinding = binding;
      whiteListedButtons.forEach((buttonName) => {
        if (binding.buttonName === buttonName) {
          currentBinding.trigger = false;
        }
      });
      return currentBinding;
    });
  };

  const changeButtonColor = (event) => {
    const element = event.target;
    element.style.background = hoverColor;
  };

  const changeBackButtonColor = (event) => {
    const color = currentStyleTemplate.dropdown.background;
    const element = event.target;
    element.style.background = color;
  };

  const addDropDownBindings = () => {
    changeWhiteListBindings();
    buttonBindings.forEach((binding) => {
      if (binding.trigger) {
        addBindings(binding.button, triggerAnimation, binding.handler);
      }
      if (binding.event) {
        addBindings(binding.button, binding.event, binding.handler);
      }
      if (binding.link) {
        addBindings(binding.button, activateLink, binding.handler);
      }
      if (binding.hover) {
        addBindings(binding.button, changeButtonColor, 'mouseover');
        addBindings(binding.button, changeBackButtonColor, 'mouseout');
      }
    });
  };

  const removeDropDownBindings = () => {
    buttonBindings.forEach((binding) => {
      removeBindings(binding.button, binding.event, binding.handler);
      removeBindings(binding.button, triggerAnimation, binding.handler);
      removeBindings(binding.button, changeButtonColor, 'mouseover');
      removeBindings(binding.button, changeBackButtonColor, 'mouseout');
    });
    buttonBindings = [];
  };

  const getStyleTemplate = () => {
    const styles = {
      dropdown: {
        background: 'blue',
        color: 'white',
        width: '200px',
        textAlign: 'center',
        transition: 'transform 300ms ease-in-out 0s',
        transform: 'scale(0)',
      },

      buttonLink: {
        color: 'white',
        textDecoration: 'none',
        height: '30px',
      },

      button: {
        height: '30px',
        cursor: 'pointer',
        lineHeight: '30px',
      },

      buttonHover: {
        background: ' rgb(0, 0, 248)',
      },
    };
    return styles;
  };

  const getTheStyleTemplate = () => {
    const template = getStyleTemplate();
    return template;
  };

  let currentStyleTemplate = getStyleTemplate();

  const renderDropDownTemplate = () => {
    removeDropDownBindings();
    dropdown.innerHTML = '';

    buttonArray.forEach((template) => {
      if (template.button.length !== 0) {
        const button = createButtonTemplate(template);
        dropdown.appendChild(button);
        let bindingTemplate;

        if (template.event) {
          bindingTemplate = {
            button,
            buttonName: template.button,
            event: template.event,
            handler: 'click',
            trigger: true,
            hover: true,
          };
        } else {
          bindingTemplate = {
            button,
            buttonName: template.button,
            link: template.link,
            hover: true,
            handler: 'click',
          };
        }
        buttonBindings.push(bindingTemplate);
      }
    });
    applyStyles(dropdown);
    addDropDownBindings();
  };

  const addButton = (button) => {
    buttonArray.push(button);
    renderDropDownTemplate();
    return buttonArray;
  };

  const addButtonByIndex = (button, index) => {
    buttonArray.splice(index, 0, button);
    renderDropDownTemplate();
    return buttonArray;
  };

  const deleteButton = (name) => {
    removeDropDownBindings();

    buttonArray = buttonArray.filter((template) => template.button !== name);
    renderDropDownTemplate();
    return buttonArray;
  };

  const deleteButtonByIndex = (index) => {
    removeDropDownBindings();

    let currentIndex = 0;
    const newButtonArray = [];

    buttonArray.forEach((template) => {
      if (currentIndex !== index) {
        newButtonArray.push(template);
      }
      currentIndex += 1;
    });

    buttonArray = newButtonArray;
    return buttonArray;
  };

  const changeStyleTemplate = (template) => {
    currentStyleTemplate = template;
    renderDropDownTemplate();

    return currentStyleTemplate;
  };

  const changeHoverColor = (color) => {
    hoverColor = color;
    renderDropDownTemplate();
  };

  const createDropDownTemplate = (element) => {
    const template = `<div class = "dropdownHolder"> ${element.outerHTML}${dropdown.outerHTML}</div>`;
    return template;
  };

  const findElement = (currentClass, target) => {
    const elements = document.getElementsByClassName(currentClass);
    let elementsArray = Array.from(elements);
    elementsArray = elementsArray.filter(
      (element) => element.getAttribute('isTarget') === target
    );

    return elementsArray[0];
  };

  const whitelistTriggerBinding = (buttonName) => {
    whiteListedButtons.push(buttonName);
  };

  const resetTriggerBindings = () => {
    whiteListedButtons = [];
  };

  const unwhitelistTriggerBinding = (buttonName) => {
    whiteListedButtons = whiteListedButtons.filter(
      (button) => button !== buttonName
    );
  };

  const findDropdownHolder = () => {
    let currentHolder = false;

    const dropdownHolder = Array.from(
      document.getElementsByClassName('dropdownHolder')
    );
    dropdownHolder.forEach((holder) => {
      const holderChildren = Array.from(holder.children);
      holderChildren.forEach((child) => {
        if (child.getAttribute('istarget') === '2') {
          currentHolder = holder;
        }
      });
    });
    return currentHolder;
  };

  const toggleButton = (event) => {
    const element = event.target;
    const elementClass = element.getAttribute('class');
    element.setAttribute('isTarget', '1');

    if (!isFormat) {
      const mainTemplate = createDropDownTemplate(event.target);

      removeBindings(element, toggleButton, 'click');

      element.outerHTML = mainTemplate;
      const originalElement = findElement(elementClass, '1');
      originalElement.removeAttribute('istarget');
      dropdown = findElement('dropdown', '2');
      const dropdownHolder = findDropdownHolder();
      const dropdownRect = dropdownHolder.getBoundingClientRect();
      dropdown.style.position = 'absolute';

      const dropdownTop = dropdownRect.top + 30;

      dropdown.style.left = `${dropdownRect.left}px`;
      dropdown.style.top = `${dropdownTop}px`;

      dropdown.removeAttribute('istarget');
      addBindings(originalElement, toggleButton, 'click');
      isFormat = true;
    }
    renderDropDownTemplate();
    triggerAnimation();
  };

  const initialize = () => {
    createDropDownElement();
    renderDropDownTemplate();
  };

  initialize();

  return {
    toggleButton,
    whitelistTriggerBinding,
    resetTriggerBindings,
    unwhitelistTriggerBinding,
    deleteButtonByIndex,
    changeStyleTemplate,
    addButton,
    addButtonByIndex,
    deleteButton,
    changeHoverColor,
    getTheStyleTemplate,
  };
};

export { DropDown };
