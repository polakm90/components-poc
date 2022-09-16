import axios from "axios";
import { Component, injectAndInitialize } from "./component";
import { ConfirmComponent } from "./confirm-component";

export class LoadExternalComponent extends Component {
  // nodes
  private root: any;
  private button: any;
  private confirm: any;

  // components
  private confirmComponent: ConfirmComponent;

  public constructor() {
    super({
      disabled: false
    });
    this.confirmComponent = new ConfirmComponent();
  }

  public startup() {
    // register nodes
    this.root = document.querySelector(".load-external-component");
    this.confirm = this.root.querySelector(".confirm-component");
    this.button = this.root.querySelector(".btn");

    // register listeners
    this.button.addEventListener("click", () => this.loadAndInitComponent());
  }

  private loadAndInitComponent() {
    axios
      .get("https://9x6gxr.csb.app/modal.jsx")
      .then((response: any) => {
        var htmlText = response.data.slice(0, -2).replaceAll("\\n", "");
        injectAndInitialize(this.confirm, htmlText, this.confirmComponent);
        this.confirmComponent.show();
      })
      .catch((error) => console.log(error));
  }

  // ----- STATE MANIPULATION SECTION -----

  public disable() {
    this.setStateValue("disabled", true);
  }

  public enable() {
    this.setStateValue("disabled", false);
  }

  // ----- RENDER SECTION -----

  protected render(state: any): void {
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
