export class Area {
    name: string;
    code: string;
    constructor(name: string, code: string) {
      this.name = name;
      this.code = code;
    }
    getImage() {
      return "https://flagsapi.com/" + this.code + "/flat/64.png"
    }
  }
  