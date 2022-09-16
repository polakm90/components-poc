import { ChangeColorComponent } from "./change-color-component";
import { RandomNumberComponent } from "./random-number-component";
import { LoadDataComponent } from "./load-data-component";
import { Component } from "./component";
import { FormValidationComponent } from "./form-validation-component";
import { LoadExternalComponent } from "./load-external-component";
import { DisableSectionsComponent } from "./disable-sections-component";

export class ExamplePageComponent extends Component {
  // constants
  private static COLORS: string[] = ["danger", "primary", "warning", "info"];
  // nodes
  private root: any;

  // components
  private changeColorComponent: ChangeColorComponent;
  private randomNumberComponent: RandomNumberComponent;
  private loadDataComponent: LoadDataComponent;
  private formValidationComponent: FormValidationComponent;
  private loadExternalComponent: LoadExternalComponent;
  private disableSectionsComponent: DisableSectionsComponent;

  // prepare state and create components
  public constructor() {
    super({ color: "primary" });

    this.changeColorComponent = new ChangeColorComponent(this);
    this.randomNumberComponent = new RandomNumberComponent();
    this.formValidationComponent = new FormValidationComponent();
    this.loadDataComponent = new LoadDataComponent(
      this.randomNumberComponent,
      this.formValidationComponent
    );
    this.loadExternalComponent = new LoadExternalComponent();
    this.disableSectionsComponent = new DisableSectionsComponent(this);
  }

  // register nodes, register event listeners and startup sub-components
  public startup() {
    // nodes
    this.root = document.querySelector(".example-page-component");

    // startup sub-components
    this.changeColorComponent.initialize();
    this.randomNumberComponent.initialize();
    this.formValidationComponent.initialize();
    this.loadDataComponent.initialize();
    this.loadExternalComponent.initialize();
    this.disableSectionsComponent.initialize();
  }

  // ----- STATE MANIPULATION SECTION -----

  public changeColor(): string {
    var randomNumber = Math.floor(
      Math.random() * ExamplePageComponent.COLORS.length
    );
    var newState = {
      color: ExamplePageComponent.COLORS[randomNumber]
    };
    super.setState(newState);
    return newState.color;
  }

  public disable() {
    this.changeColorComponent.disable();
    this.formValidationComponent.disable();
    this.randomNumberComponent.disable();
    this.loadDataComponent.disable();
    this.loadExternalComponent.disable();
  }
  public enable() {
    this.changeColorComponent.enable();
    this.formValidationComponent.enable();
    this.randomNumberComponent.enable();
    this.loadDataComponent.enable();
    this.loadExternalComponent.enable();
  }

  // ----- RENDER SECTION -----

  protected render(state: any): void {
    this.removeBackgroudColor();
    let color = state.color;
    this.root.classList.add("bg-" + color);
    return;
  }

  private removeBackgroudColor() {
    this.root.classList.add("bg-primary");
    this.root.classList.remove("bg-info");
    this.root.classList.remove("bg-warning");
    this.root.classList.remove("bg-danger");
  }
}
