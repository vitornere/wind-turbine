export class TurbineDataModel {
  id: number;
  image_src: string;
  title: string;
  subtitle: number;
  unity: string;

  constructor(id: number, image_src: string, title: string, subtitle: number, unity: string) {
    this.id = id;
    this.image_src = image_src;
    this.title = title;
    this.subtitle = subtitle;
    this.unity = unity;
  }
}
