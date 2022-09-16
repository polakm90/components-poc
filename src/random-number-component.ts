import { Component } from "./component";

export class RandomNumberComponent extends Component {
  // nodes
  private root: any;
  private button: any;
  private number: any;

  public constructor() {
    super({ number: Math.ceil(Math.random() * 10) });
  }

  public startup() {
    this.root = document.querySelector(".random-number-component");
    this.button = this.root.querySelector(".btn");
    this.number = this.root.querySelector(".js-random-number");
    this.button.addEventListener("click", () => {
      this.generateRandomNumber();
    });
  }

  // ----- STATE MANIPULATION SECTION -----

  private generateRandomNumber() {
    var newState = {
      number: Math.ceil(Math.random() * 10)
    };
    this.setState(newState);
  }
  public getCurrentNumber() {
    return this.getStateValue("number");
  }

  public disable(): void {
    this.setStateValue("disabled", true);
  }

  public enable(): void {
    this.setStateValue("disabled", false);
  }

  // ----- RENDER SECTION -----

  protected render(state: any) {
    if (state.disabled) {
      this.root.classList.add("text-muted");
      this.button.setAttribute("disabled", "disabled");
    } else {
      this.root.classList.remove("text-muted");
      this.button.removeAttribute("disabled", "disabled");
    }

    this.number.innerText = state.number;
    return;
  }
}
