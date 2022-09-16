import { ExamplePageComponent } from "./example-page-component";
import { createAndInitialize } from "./component";
import { Injector, InjectableComponent } from "./ioc";

//doesn't work in codesandbox
//document.addEventListener("onreadystatechange", () => {
createAndInitialize(ExamplePageComponent);

// other way to init
//   var examplePageComponent = new ExamplePageComponent();
//   examplePageComponent.initialize();

//var exampleComponent = Injector.resolve(ExamplePageComponent);
//exampleComponent.initialize();

Injector.resolve(InjectableComponent);

//});
