import { Injectable } from '@angular/core';
@Injectable()
export class ServiceModule { 
public arrayDelService: Array<any>;
setArray(array: any) {
  this.arrayDelService = array;
}
getArray() {
  return this.arrayDelService;
}
}