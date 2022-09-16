import { Component } from "./component";

export class FormValidationComponent extends Component {
  // nodes
  private root: any;
  private email: any;
  private error: any;
  private success: any;
  private button: any;

  public constructor() {
    super({
      email: null,
      invalid: null,
      disabled: false
    });
  }

  public startup() {
    // register nodes
    this.root = document.querySelector(".form-validation-component");
    this.button = this.root.querySelector(".btn");
    this.email = this.root.querySelector(".js-email");
    this.error = this.root.querySelector(".js-email-error");
    this.success = this.root.querySelector(".js-email-success");

    // register listeners
    this.email.addEventListener("change", (event: any) => {
      this.setEmail(event.target.value);
    });
    this.button.addEventListener("click", () => {
      this.validateEmail();
    });
  }

  // ----- STATE MANIPULATION SECTION -----

  public setEmail(newEmail: string) {
    this.setStateValue("email", newEmail);
    this.setStateValue("invalid", null);
  }

  private validateEmail() {
    var email = this.getStateValue("email");
    if (email) {
      var invalid = email?.indexOf("@") === -1;
      this.setStateValue("invalid", invalid);
    } else {
      this.setStateValue("invalid", null);
    }
  }

  public show(): any {
    this.setStateValue("hidden", false);
  }

  public hide() {
    this.setStateValue("hidden", true);
  }

  public disable() {
    this.setStateValue("disabled", true);
  }

  public enable() {
    this.setStateValue("disabled", false);
  }

  // ----- RENDER SECTION -----

  protected render(state: any) {
    if (state.disabled) {
      this.root.classList.add("text-muted");
      this.email.setAttribute("disabled", "disabled");
      this.button.setAttribute("disabled", "disabled");
    } else {
      this.root.classList.remove("text-muted");
      this.email.removeAttribute("disabled", "disabled");
      this.button.removeAttribute("disabled", "disabled");
    }

    this.email.value = state.email || "";
    if (state.invalid === true) {
      this.success.classList.add("d-none");
      this.error.classList.remove("d-none");
    } else if (state.invalid === false) {
      this.error.classList.add("d-none");
      this.success.classList.remove("d-none");
    } else {
      this.error.classList.add("d-none");
      this.success.classList.add("d-none");
    }
    return;
  }
}
