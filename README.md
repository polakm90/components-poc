# Type Script Components - Proof of Concept

## Getting start

Extend the Component class this way `export class MyComponent extends component { }`.
Create `constructor()` and invoke `super.constuctor(state:any)` to set initial component state.
You can add releated components as argument `construcor(otherCompontent: OtherComponent)`
Implement method `startup()` to register nodes and event listeners.
Event listeners should invoke `private` methods what manipulate component sate or public methods form releated components.
In your methods use `this.setState(state:any)` or `this.setSateValue(key:string,value:any)` to change component state.
Implement method `render(state:any)` to manipulate HTML nodes to present new component state.
Inilize you component in main script by `createAndInitialize(MyComponent)` on document ready handler.
Other way to initialize component is create component by constructor `var myCmponent = new MyComponent` and initialize by method `myCmponent.initilize()` on document ready handler.

## The rules

### CREATION

- Don't do other things than set references to other components or set initial state

### STARTUP

- Don't register HTML nodes out of root node of your component,
- Don't manipulate state in `startup()` method,
- Don't manipulate HTML in `startup()` method,
- Don't listen events form nodes what are out of your component root.
- Don't render initialize and render here other components.
- You can startup or initlize here sub-components,
- You can invoke methods on event what manipulate state

### STATE

- Don't manipulate HTML in this section!
- Don't manipulate state of other components directly
- Create public methods for manipulate state by other components.
- Create private methods for manipulate state by internal event handelers.
- Use methods `this.setState(state)` and `this.setStateValue(key:string,value:any)` to change state.
- You can use data form ajax to change state of your component

### RENDER

- Don't manipulate state
- Don't register listeners and nodes
- Don't create releated components
- Don't startup releated components
- Don't use releated components
- Don't read state form HTML
- Don't use other values than this from `state` to control render
- Don't invoke `render(state:any)` method mannualy
