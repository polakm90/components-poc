import "reflect-metadata";

export interface Constructor<T> {
  new (...args: any[]): T;
}

export type ClassDecorator<T extends Function> = (
  Target: Constructor<T>
) => T | void;

export const Injectable = (): ClassDecorator<any> => {
  return (target) => {};
};

export const Injector = new (class {
  resolve<T>(Target: Constructor<T>): T {
    const requiredParams =
      Reflect.getMetadata("design:paramtypes", Target) || [];
    const resolvedParams = requiredParams.map((param: any) =>
      Injector.resolve(param)
    );
    const instance = new Target({ ...resolvedParams });
    return instance;
  }
})();
/// test

@Injectable()
export class InjectableSubComponent2 {
  constructor() {
    console.log("InjectableSubComponent2 incjected!");
  }
}

@Injectable()
export class InjectableSubComponent {
  constructor(private subComponent: InjectableSubComponent2) {
    console.log("InjectableSubComponent incjected!");
  }
}

@Injectable()
export class InjectableComponent {
  constructor(private subComponent: InjectableSubComponent) {
    console.log("InjectableComponent incjected!");
  }
}
