import { Component } from "./component";

export class ConfirmComponent extends Component {
  private root: any;
  private confirmButton: any;
  private xButton: any;
  private closeButton: any;

  constructor() {
    super({ hidden: false });
  }

  public startup() {
    // register nodes
    this.root = document.querySelector(".confirm-component");
    this.xButton = this.root.querySelector(".close");
    this.confirmButton = this.root.querySelector(".btn");
    this.closeButton = this.root.querySelector(".btn-secondary");

    // register listeners
    this.xButton.addEventListener("click", () => this.hide());
    this.confirmButton.addEventListener("click", () => this.hide());
    this.closeButton.addEventListener("click", () => this.hide());
  }

  // ----- STATE MANIPULATION SECTION -----

  public show(): void {
    this.setStateValue("hidden", false);
  }

  public hide(): void {
    this.setStateValue("hidden", true);
  }

  // ----- RENDER SECTION -----

  protected render(state: any): void {
    if (state.hidden) {
      this.root.classList.add("d-none");
      this.root.classList.remove("d-block");
    } else {
      this.root.classList.add("d-block");
      this.root.classList.remove("d-none");
    }
    return;
  }
}
