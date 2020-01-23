export class ArrayHelper {
  public static contains(target: any, pattern: any): any[] | boolean {
    let contains: Array<any> = [];
    pattern.forEach((element: any) => {
      if (target.includes(element)) {
        contains.push(element);
      }
    });

    return !contains.length ? false : contains;
  }
}
