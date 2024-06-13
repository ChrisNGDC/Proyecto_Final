export class Area {
  name: string;
  code: string;
  image: string
  plate: boolean;
  favorite: boolean;
  constructor(name: string, code: string) {
    this.name = name;
    this.code = code;
    this.plate = false;
    this.favorite = false;
    this.image = this.getImage();
  }
  getImage() {
    return 'https://flagsapi.com/' + this.code + '/flat/64.png';
  }
}
