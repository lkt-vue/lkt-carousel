# LKT Button
A simple button component for Vue.js 3.0.

## Installation

### With npm

```bash
npm i -S lkt-button
```

## Typical use:
In your main.js
```js
  import LktButton from 'lkt-button';
  
  app.use(LktButton);
```

App use options:

* `defaultState` string (default: undefined) => Set a default state for all buttons

In your component:

```html
<lkt-button v-on:click="doSomething" v-bind:disabled="disabledChecker"></lkt-button>
```
```js
export default {
    methods: {
      doSomething() {
          console.log('May the force be with you');
      },
      disabledChecker() {
          return false;
      },
      
    }
}
```

## Props

### type
Type: `String`<br>
Required: `false`<br>
Default: `button` <br>
Options: `button`, `submit`, `reset`

Determines which kind of button will be.
```html
<lkt-button type="submit"></lkt-button>
```

### name
Type: `String`<br>
Required: `false`<br>
Default: `a random string is generated` <br>

An identifier emitted on click.
```html
<lkt-button name="sendMessage"></lkt-button>
```

### value
Type: `String`<br>
Required: `false`<br>
Default: `'`

Set a value for form buttons. Emitted on click.
```html
<lkt-button v-bind:value="myButton"></lkt-button>
```

### palette
Type: `String`<br>
Required: `false`<br>
Default: `''`

Appends a palette classname. It's useful for palette control and styling.
```html
<lkt-button palette="calculating"></lkt-button>
```

### disabled
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Determines if button is disabled or not.
```html
<lkt-button disabled></lkt-button>
<lkt-button v-bind:disabled="disabledChecker"></lkt-button>
```


### Events

* LktButton emits these events:

  - `click`

HTML:
```HTML
<lkt-button v-on:click="doSomething"></lkt-button>
```

### Slots

#### default slot
This slot allows you to fill the button with whatever you want.

```html
<lkt-button name="testButton" v-on:click="doSomething">
  Click, me!
</lkt-button>
```

#### prev/next slot
These slots are designed to add something before/after the text, like an icon.

```html
<lkt-button name="testButton" v-on:click="doSomething">
  Click, me!
  <template v-slot:prev>
    <i class="font-icon"></i>
  </template>
  <template v-slot:next>
    <i class="font-icon2"></i>
  </template>
</lkt-button>
```

#### prev-loading/next-loading slot
Same as prev/next but only appears if button is loading

```html
<lkt-button name="testButton" v-on:click="doSomething">
  Click, me!
  <template v-slot:prev-loading>
    <i class="font-icon"></i>
  </template>
  <template v-slot:next-loading>
    <i class="font-icon2"></i>
  </template>
</lkt-button>
```

## Styling

### Style configuration

If you want to modify the default style without having to override styles in CSS, you can use the configurator like this:

```scss
@use "node_modules/lkt-button/lkt-button";

@include lkt-button.configure((border-width: 2px)); //opts list
```

#### Available style options
| Option        | Default value                         |
|---------------|---------------------------------------|
| border-width  | 1px                                   |
| border-style  | solid                                 |
| border-color  | #ddd                                  |
| color         | #333                                  |
| background    | transparent                           |
| height        | 35px                                  |
| min-width     | 150px                                 |
| padding       | 7px                                   |
| slot-gap      | 5px                                   |
| font-weight   | 300                                   |
| line-height   | 1                                     |
| text-align    | center                                |
| cursor        | default                               |
| box-shadow    | none                                  |
| border-radius | lkt-theme.$primary-border-radius      |
| transition    | lkt-theme.$primary-transition         |
| font-size     | lkt-theme.$primary-button-font-size   |
| font-family   | lkt-theme.$primary-button-font-family |

### Style generation

The following example will show you how to generate styles.

```scss
@use "node_modules/lkt-button/lkt-button";

@include lkt-button.generate();
```

#### Theme modifiers

If ```lkt-theme``` is configured, the ```generate``` mixin also will generate some colored styles if colors were configured in ```lkt-theme```.

These modifiers will be the way:

lkt-button--<color>
lkt-button--<color>-dark
lkt-button--<color>-darker
lkt-button--<color>-light
lkt-button--<color>-lighter

For example, if you already set up info color and info color dark, it will generate the following modifiers:

lkt-button--info
lkt-button--info-dark

All ```lkt-theme``` colors can generate a modifier but disabled (which generates styles if button is disabled) and focus (which is not intended for this component).

Some example could be:

lkt-button--info
lkt-button--info-dark
lkt-button--info-darker
lkt-button--info-light
lkt-button--info-lighter

lkt-button--success
lkt-button--success-dark
lkt-button--success-darker
lkt-button--success-light
lkt-button--success-lighter

lkt-button--warning
lkt-button--warning-dark
lkt-button--warning-darker
lkt-button--warning-light
lkt-button--warning-lighter

#### Using CSS Selectors in HTML
```html
<lkt-button class="lkt-button--info">More info</lkt-button>

<lkt-button class="lkt-button--success-light">Confirm action</lkt-button>
```

#### The ```palette``` prop
You can apply ```lkt-theme``` modifiers with the palette prop this way:


```html
<lkt-button palette="info">More info</lkt-button>

<!-- Is the same as: -->

<lkt-button class="lkt-button--info">More info</lkt-button>
```