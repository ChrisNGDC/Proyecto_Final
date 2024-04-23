export class Ingredient {
  name: string;
  amount: string;
  done: boolean;
  constructor(name: string, amount: string) {
    this.name = name;
    this.amount = amount;
    this.done = false;
  }
}
