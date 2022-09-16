import axios from "axios";
import { Component } from "./component";
import { RandomNumberComponent } from "./random-number-component";
import { FormValidationComponent } from "./form-validation-component";

export class LoadDataComponent extends Component {
  // nodes
  private root: any;
  private userName: any;
  private button: any;

  // releated compoponents
  private randomNumberComponent: RandomNumberComponent;
  private formValidationComponent: FormValidationComponent;

  public constructor(
    randomNumberComponent: RandomNumberComponent,
    formValidationComponent: FormValidationComponent
  ) {
    super({ name: null, disabled: false });
    this.randomNumberComponent = randomNumberComponent;
    this.formValidationComponent = formValidationComponent;
  }

  public startup() {
    // nodes
    this.root = document.querySelector(".load-data-component");
    this.userName = this.root.querySelector(".js-user-name");
    this.button = this.root.querySelector(".btn");

    // listeners
    this.button.addEventListener("click", () => this.loadUserData());
  }

  // ----- STATE MANIPULATION SECTION -----

  private loadUserData() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response: any) => {
        var number = this.randomNumberComponent.getCurrentNumber();
        var user = response.data[number];
        this.setStateValue("name", user?.name);
        this.formValidationComponent.setEmail(user?.email);
      })
      .catch((error) => console.log(error));
  }

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

    this.userName.innerText = state.name || "";
    return;
  }
}
