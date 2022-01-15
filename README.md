#H1 What is this?
this is a package that allows you to add a dropdown menu on any object that

#installation

`npm -i dropdown --save`

# Usage

In order to trigger the animation you must import it and add it an
eventlistener to it with the dropdown.triggerButton, here is an example

```
import {DropDown} from  'dropdown'
import { DropDown } from './dropdown.js';

const buttons = [{ button: 'test1', link: 'index.html' }];

const Dropdown1 = DropDown(buttons);

const currentDropDown = document.querySelector('.currentDropdown');
currentDropDown.addEventListener('click', Dropdown1.toggleButtonz

```

## Button Template

when you create a button for dropdown it must follow this template or else the code will not work.

```

button = { button: 'test1', link: 'index.html' }
//if you want the button to correspond to a function instead of a link than replace link with event.

button = { button: 'test1', event: someRandomFunction}




//button must be inside an array for dropdown to work

buttons = [{ button: 'test1', link: 'index.html' }]


```

## Styles

Dropdown buttons can be customized to a style that matches your navigation using the stylesheet it works exactly like normal css but for the button, however youst must use the change hover color function to change its color.

```

const newStyles = {
  dropdown: {
    background: 'red',
    color: 'black',
    width: '50px',
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

Dropdown1.changeStyleTemplate(newStyles);
Dropdown1.changeHoverColor('brown');

//if you cannot remember this template use the getTheStyleTemplate function to get the default style template which than you can modify and use.

const styletemplate = Dropdown1.getTheStyleTemplate();
```

## Disabling Closing animation

Sometimes you want to disable the dropdown from closing when you click a button. To do this you can whitelist the button which will prevent the animation from closing you can also reset the whitelist and or unwhitelist the button.

```
Dropdown1.whitelistTriggerBinding('test1');
Dropdown1.unwhitelistTriggerBinding('test1');
Dropdown1.resetTriggerBindings();
```

## Adding and Deleting Buttons

You will probably want to delete or add some buttons or change the order you can do theset adding and deleting button functions

```
Dropdown1.addButton(button2);
Dropdown1.deleteButtonByIndex(0);
Dropdown1.addButtonByIndex(button2, 0);
Dropdown1.deleteButton('test2');
```
