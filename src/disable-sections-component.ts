import { Component } from "./component";
import { ExamplePageComponent } from "./example-page-component";

export class DisableSectionsComponent extends Component {
  // nodes
  private root: any;
  private disableButton: any;
  private enableButton: any;

  // related components
  private examplePageComponent: ExamplePageComponent;

  public constructor(examplePageComponent: ExamplePageComponent) {
    super({ disabled: false });
    this.examplePageComponent = examplePageComponent;
  }

  public startup() {
    // register nodes
    this.root = document.querySelector(".disable-sections-component");
    this.disableButton = this.root.querySelector(".js-disable");
    this.enableButton = this.root.querySelector(".js-enable");

    // register listeners
    this.disableButton.addEventListener("click", () => {
      this.disableSections();
    });
    this.enableButton.addEventListener("click", () => {
      this.enableSections();
    });
  }

  // ----- STATE MANIPULATION SECTION -----

  disableSections(): void {
    this.examplePageComponent.disable();
    this.setState({ disabled: true });
  }

  enableSections(): void {
    this.examplePageComponent.enable();
    this.setStateValue("disabled", false);
  }

  protected render(state: any): void {
    if (state.disabled) {
      this.enableButton.classList.remove("d-none");
      this.disableButton.classList.add("d-none");
    } else {
      this.enableButton.classList.add("d-none");
      this.disableButton.classList.remove("d-none");
    }
    return;
  }
}
