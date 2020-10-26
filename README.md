## Panel Beater

A module which enables sliding transition between panels in a browser viewport. Written in Vanilla Javascript
and using CSS transitions.

Demonstration: https://richardinho.github.io/panel-beater/

  
#### usage
Include script in html page
```html
<script type="module" src="main.mjs"></script>
```
  
Call panelBeater function passing in options object as argument
```js
panelBeater(options);
```

#### config options
  
##### panelSelector
Type: `String`
  
The css selector representing a panel on the page. When the panelBeater function runs it will collect all 
elements corresponding to this selector and store them as its list of panels.

##### overlayId
Type: `String`

The value of the id attribute representing the element to be used for the overlay which will appear 
during transitions. The default overlay is a transparent element.

##### initialPanelId
Type: `String`

The id of the panel which should be shown in the initial state.

#### HTML configuration
Further configuration is done within html code. Each element which represents a panel should
have a corresponding classname which is configured in the options object. Nested panels are not supported.
The data-transition attribute is added to elements which will act as triggers for panel transition. The value
of this attribute corresponds to the id of the panel to which we wish to transition to.

```html
<div id='alpha' class='panel'>
    <div class='panel-contents'>
        <h1>Alpha</h1>
        <a href='' data-transition='beta'>beta</a>
    </div>
</div>
<div id='beta' class='panel'>
    <div class='panel-contents'>
        <a href='' data-transition='alpha'>go to alpha panel</a>
    </div>
</div>
```

