/**
 * Mapped Types
 */

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean
}

type FeatureFlags = {
  darkMode: () => void
  newUserProfile: () => void
}

type FeatureOptions = OptionsFlags<FeatureFlags>

/**
 * Mapping Modifiers
 */
// There are two additional modifiers which can be applied during mapping: readonly and ? which affect mutability and optionality respectively.
// You can remove or add these modifiers by prefixing with - or +. If you don’t add a prefix, then + is assumed.
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property]
}

type LockedAccount = {
  readonly id: string
  readonly name: string
}

type UnlockedAccount = CreateMutable<LockedAccount>

type Concrete<Type> = {
  [Property in keyof Type]: Type[Property]
}

type MaybeUser = {
  id: string
  name?: string
  age?: number
}

type User = Concrete<MaybeUser>

type MyOptional<T> = {
  [P in keyof T]?: T[P]
}
type aaa = MyOptional<MaybeUser>

type MyRequired<T> = {
  [P in keyof T]-?: T[P]
}
type aaa1 = MyRequired<MaybeUser>

type MyReadonly<T> = {
  readonly [p in keyof T]: T[p]
}
type aaa2 = MyReadonly<MaybeUser>

/**
 * Key Remapping via as
 */
 type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;

// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};

interface Circle {
  kind: "circle";
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;


type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>


/**
 * Further Exploration
 */
 type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};
 
type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};
 
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;