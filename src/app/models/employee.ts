export class Employee {
  public id: string;
  public name: string;
  public email: string;

  constructor(name: string, email: string, id: string = '') {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
