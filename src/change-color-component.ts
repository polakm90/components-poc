import { Component } from "./component";
import { ExamplePageComponent } from "./example-page-component";

export class ChangeColorComponent extends Component {
  // nodes
  private root: any;
  private button: any;
  private color: any;

  // related components
  private examplePageComponent: ExamplePageComponent;

  public constructor(examplePageComponent: ExamplePageComponent) {
    super({ enable: true, color: "primary" });
    this.examplePageComponent = examplePageComponent;
  }

  public startup() {
    // register nodes
    this.root = document.querySelector(".change-color-component");
    this.button = this.root.querySelector(".btn");
    this.color = this.root.querySelector(".js-color");

    // register listeners
    this.button.addEventListener("click", () => {
      var color = this.examplePageComponent.changeColor();
      this.setStateValue("color", color);
    });
  }

  // ----- STATE MANIPULATION SECTION -----

  public disable(): void {
    this.setState({ disabled: true });
  }

  public enable(): void {
    this.setState({ disabled: false });
  }

  // ------ RENDER SECTION ------

  protected render(state: any): void {
    this.color.innerText = state.color || "";

    if (state.disabled) {
      this.root.classList.add("text-muted");
      this.button.setAttribute("disabled", "disabled");
    } else {
      this.root.classList.remove("text-muted");
      this.button.removeAttribute("disabled", "disabled");
    }
    return;
  }
}
