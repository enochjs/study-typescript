interface Admin {
  name: string
  roles: string[]
  departments: string[]
}

interface Employee {
  name: string
  date: Date
  age: string
}

type UninType = Admin | Employee

function printe(emp: UninType) {
  console.log(emp.name)

  // in 操作符判断
  if ('roles' in emp) {
    console.log(emp.departments)
  }
}

class Car {
  drive() {
    console.log('griving car ...')
  }
}

class Truck {
  drive() {
    console.log('driving truck...')
  }

  loadingCargo(amiung: number) {
    console.log('loading cargo: ' + amiung)
  }
}

type vehicle = Car | Truck

function useVehicle(veh: vehicle) {
  veh.drive()

  if (veh instanceof Truck) {
    console.log(veh.loadingCargo(30))
  }
}

interface Bird {
  type: 'bird'
  flyingSpeed: number
}

interface Snake {
  type: 'snake'
  crawlingSpeed: number
}

interface Horse {
  type: 'horse'
  runingSpeed: number
}

type Animal = Bird | Snake | Horse

function checkAnimalSpeed(animal: Animal) {
  switch (animal.type) {
    case 'bird':
      return animal.flyingSpeed
    case 'horse':
      return animal.runingSpeed
    case 'snake':
      return animal.crawlingSpeed
  }
}

// type a = string

interface ErrorContainer {
  [key: string]: string
  // id: number
}

let errorBag: ErrorContainer = {
  email: 'email is valid',
  name: 'string',
}

type combinable = number | string
type numeric = number | boolean

function getAdd(a: string, b: string): string
function getAdd(a: number, b: number): number
function getAdd(a: string, b: number): string
function getAdd(a: number, b: string): string
function getAdd(a: combinable, b: combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }

  return a + b
}

const result = getAdd(1, 2)
