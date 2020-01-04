import { isNullOrUndefined } from 'util';
import Employee from './Employee';

export default class PresentEmployeeListModel {
    public presentEmployeeList: any[];
    public presentEmpIds: any[];

    private extractData(response): Array<object> {
        if (isNullOrUndefined(response) || isNullOrUndefined(response.data) || response.success === false) {        
            return [];
        }
        return response.data.map(element => new Employee(element));
        // const data = [];
        // response.data.forEach((element) => {
        //   const row = new Employee(element);
        //   data.push(row);
        // });
        // return data;
    }

    public static ModelMap(response) {
        const self = new this();
        const list = self.extractData(response);
        self.setList(list);
        return self;
    }

    public getList() {
        return this.presentEmployeeList;
    }

    public setList(list) {
        this.presentEmpIds = list.map(emp => emp.id);
        this.presentEmployeeList = [...list];
    }
}