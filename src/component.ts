export abstract class Component {
  private state: any;

  // set initial state and relates components
  constructor(state: any) {
    this.state = Object.assign({}, state);
  }

  // run during load page to intialize main component
  public initialize() {
    this.startup();
    this.render(this.state);
  }

  // register nodes and listeners
  public abstract startup(): any;

  // ---------- STATE SECTION ----------

  protected setState(newState: any): void {
    var copyOfNewState = Object.assign({}, newState);
    this.state = copyOfNewState;
    var copyOfState = Object.assign({}, this.state);
    this.render(copyOfState);
  }

  protected getState(): any {
    var copyOfState = Object.assign({}, this.state);
    return copyOfState;
  }

  protected setStateValue(key: string, value: any): void {
    this.state[key] = value;
    this.state = Object.assign({}, this.state);
    var copyOfState = Object.assign({}, this.state);
    this.render(copyOfState);
  }

  protected getStateValue(key: string): any {
    var copyOfState = Object.assign({}, this.state);
    return copyOfState[key];
  }

  // ---------- RENDER SECTION ----------

  protected abstract render(state: any): void;
}

// -------------- HELPERS ---------------
export function injectAndInitialize(
  contarinerNode: any,
  html: string,
  component: Component
) {
  contarinerNode.innerHTML = html;
  component.initialize();
}

export function createAndInitialize(create: { new (): Component }): Component {
  var component = new create();
  component.initialize();
  return component;
}
