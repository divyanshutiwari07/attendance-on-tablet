import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { PersonDataService } from '../../../services/person-data.service';
import PresentEmployeeListModel from '../../../models/present-employee-list-model';
import PresentNewEmployeeModel from '../../../models/present-new-employee-model';
import { isNullOrUndefined } from 'util';
import { NotificationService } from '../../../services/notification.service';
import { AuthGuard } from 'src/app/shared/guard';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  public newPersonCame;
  public empRecord: any = {};
  public person = {
    name: '',
    isRecognized: true,
  };
  private startTime: number;
  private endTime: number;
  public empListObj: PresentEmployeeListModel;
  public empIds;
  public empQueue = [];
  public getRegisteredUsersName: any = [];
  public iterableDiffer;

  constructor(
    private apiService: ApiService,
    private personData: PersonDataService,
    private notifyService: NotificationService,
    private auth: AuthGuard) {
    }


  ngOnInit() {
    this.startSocketConnection();
    this.initForm();

    this.startTime = new Date().setHours(0, 0, 0, 0);
    this.endTime = new Date().setHours(23, 59, 59, 999);

    this.getPresentEmpData();
    this.getRegisterUsersData();

    console.log('testing production');

  }

  private getRegisterUsersData() {
    this.apiService.getListOfRegisteredUsers()
    .subscribe(
      response => {
        console.log('registered users data', response);
        this.getRegisteredUsersName = this.getListOfRegisteredUsersName(response.data);
        console.log('list object', this.getRegisteredUsersName);
      }
    );
  }

  private getListOfRegisteredUsersName(res) {
    if (isNullOrUndefined(res) || res.success === false) {
      // this.errorToaster(res.msg);
      console.log('no registered users data found');
      return [];
    }

    const getRegisteredUsersName = res.map((a) => a.awi_label);
    return getRegisteredUsersName.map((d) => {
      return  {name: d };
    });
  }

  private getPresentEmpData() {
    console.log('getpresentempdata');
    this.apiService.getPresentEmployeesForDate({start_time: this.startTime, end_time: this.endTime })
    .subscribe(
      response => {
        console.log('prestn emp data', response);
        this.empListObj = PresentEmployeeListModel.ModelMap(response);
        this.empIds = this.empListObj.presentEmpIds;
        console.log('emp ids', this.empIds);
        // console.log("emp Ids", empListObj.presentEmpIds);

        this.checkNewPresentEmp();
      }
    );
  }

  startSocketConnection() {
    console.log('startSocketConnection');
    this.personData.initConnection('Access Real Time Data from server');
  }

  private checkNewPresentEmp() {
    this.personData.messages.subscribe(data => {
      console.log('new person ', data);
      const newPerson = PresentNewEmployeeModel.ModelMap(data).presentEmployee;
      // const newPerson = this.extractDataForNewEmp(data);
      // console.log('checknewperson' , newPerson);
      const index = this.empQueue.findIndex((e) => e.id === newPerson.id);

      if (index === -1 && newPerson.name !== 'Unrecognized') {
      // if (index === -1) {
          this.empQueue.push(newPerson);
      } else {
          // this.empQueue[index] = newPerson;
      }
      console.log('Queue Status', this.empQueue);
      if ( !Object.keys(this.empRecord).length ) {
        this.showNextPersonInTheQueue();
      }
    }, (error) => {
      console.log('error', error);
  }
    );
  }

  // private extractDataForNewEmp(res) {

  //   const row = {name: null, inTime: null, outTime: null, location: null, department: null , photo: null,  id: 0};
  //   const dynamicKey = res.data.awi_facial_recognition.awi_app_data.awi_blobs.awi_blob_ids[0];

  //   row.department = res.data.awi_facial_recognition.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_subclass;

  //   row.inTime = res.data.timestamp;
  //   row.outTime = res.data.timestamp;
  //   row.location = res.data.awi_facial_recognition.location;

  //   row.name = res.data.awi_facial_recognition.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_label;

  //   row.id = res.data.awi_facial_recognition.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_id;
  //   return row;
  // }

  public onVerify() {
    console.log('Verified');
    console.log(this.person);
    // tslint:disable-next-line:max-line-length
    this.apiService.verifyEmployeePresence({'id' : this.empRecord.alertId, 'blob_id': this.empRecord.blobId, 'awi_label': this.empRecord.name}).subscribe( response => {
      console.log('verify emp presence', response);
      if ( response.success === true ) {
        this.successToaster('Verify Successfully !');
        this.addToTheList(this.empRecord);
        this.initForm();
        this.showNextPersonInTheQueue();
      } else {
        this.errorToaster(response.msg);
      }
    });

  }

  public onSubmit() {
    console.log('Submitted');
    console.log(this.person);
    // tslint:disable-next-line:max-line-length
    this.apiService.verifyEmployeePresence({'id' : this.empRecord.alertId, 'blob_id': this.empRecord.blobId, 'awi_label': this.person.name}).subscribe( response => {
      console.log('verify emp presence', response);
      if ( response.success === true ) {
        this.successToaster(response.msg);
        this.addToTheList(this.empRecord);
        this.initForm();
        this.showNextPersonInTheQueue();
      } else {
        this.errorToaster(response.msg);
      }
    });

  }

  public rejectDetection() {
    console.log('rejected detection', );
    // this.empRecord = {};
    this.initForm();
    this.showNextPersonInTheQueue();
  }

  private addToTheList(newPerson) {
    this.empIds.push(newPerson.id);
    console.log('addToTheList called: new Emp Ids', this.empIds);
  }

  public showNextPersonInTheQueue() {
    this.empRecord = {};
    if ( !this.empQueue.length ) { return; }
    const newPerson = {...this.empQueue.shift()};
    if ( this.empIds.indexOf( newPerson.id ) === -1 ) {
    // if ( this.empIds.indexOf( newPerson.id ) !== -1 ) {
      this.empRecord = newPerson;
      this.newPersonCame = true;
      console.log('newEmpRecord', this.empRecord);
    } else {
      console.log('emp already present');
      this.showNextPersonInTheQueue();
    }
  }

  public initForm() {
      this.person = {
        name: '',
        isRecognized: true
      };
      this.newPersonCame = false;
  }

  successToaster(message: string) {
    this.notifyService.showSuccess(message,  '');
  }

  errorToaster(message: string) {
    this.notifyService.showError(message,  '');
  }

}
