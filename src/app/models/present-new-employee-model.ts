import { isNullOrUndefined } from 'util';
import NewEmployee from './new-employee';

export default class PresentNewEmployeeModel {

  public presentEmployee: any = {};

  public static ModelMap(res) {
    const self = new this();
    const record = self.extractDataForNewEmp(res);
    self.setRecord( record );
    return self;
  }

  private extractDataForNewEmp(res) {

    if (isNullOrUndefined(res) || isNullOrUndefined(res.data) || res.success === false) {
      return [];
    }

    return new NewEmployee(res);
  }

  public getRecord() {
    return this.presentEmployee;
  }

  public setRecord(record) {
    this.presentEmployee = {...record};
  }

}
