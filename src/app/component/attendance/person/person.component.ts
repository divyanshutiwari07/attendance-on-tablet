import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { PersonDataService } from '../../../services/person-data.service';
import PresentEmployeeListModel from '../../../models/present-employee-list-model';
import PresentNewEmployeeModel from '../../../models/present-new-employee-model';
import { isNullOrUndefined } from 'util';
import { NotificationService } from '../../../services/notification.service';
import { AuthGuard } from 'src/app/shared/guard';
import * as Utils from '../../../common/utils';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  public newPersonCame;
  public empRecord: any = {};
  public person = {
    name: {
      name: '',
      id: 0
    },
    isRecognized: true,
  };
  private startTime: number;
  private endTime: number;
  public empListObj: PresentEmployeeListModel;
  public empIds;
  public empQueue = [];
  public getRegisteredUsersName: any = [];
  private todaysDate;

  constructor(
    private apiService: ApiService,
    private personData: PersonDataService,
    private notifyService: NotificationService,
    private auth: AuthGuard) {
      this.todaysDate = new Date();
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

    // const getRegisteredUsersName = res.map((a) => a.awi_label);
    // return getRegisteredUsersName.map((d) => {
    //   return  {name: d,};
    // });
    return res.map((a) => {
      return  {name: a.awi_label, id: a.awi_id};
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

      if (index === -1 && newPerson.name !== 'Unrecognized' && newPerson.id !== this.empRecord.id ) {
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

  public onVerify() {
    console.log('Verified');
    console.log(this.person);
    this.initForm();
    this.addToTheList(this.empRecord);
    this.showNextPersonInTheQueue();
    
    // tslint:disable-next-line:max-line-length
    // this.apiService.verifyEmployeePresence({'id' : this.empRecord.alertId, 'blob_id': this.empRecord.blobId, 'awi_label': this.empRecord.name}).subscribe( response => {
    //   console.log('verify emp presence', response);
    //   if ( response.success === true ) {
    //     this.successToaster('Verify Successfully !');
    //     this.addToTheList(this.empRecord);
    //     this.initForm();
    //     this.showNextPersonInTheQueue();
    //   } else {
    //     this.errorToaster(response.msg);
    //   }
    // });
  }

  public onSubmit() {
    console.log('Submitted');
    console.log('person', this.person.name);
    // console.log('person', this.person.name.name);
    // tslint:disable-next-line:max-line-length
    if ( this.person.name.name ) {
      // tslint:disable-next-line:max-line-length
      this.apiService.verifyEmployeePresence({id : this.empRecord.alertId, blob_id: this.empRecord.blobId, awi_label: this.person.name.name}).subscribe( response => {
        console.log('verify emp presence', response);
        if ( response.success === true ) {
          this.successToaster(response.msg);
          this.addToTheList(this.person.name);
          this.initForm();
          this.showNextPersonInTheQueue();
        } else {
          this.errorToaster(response.msg);
        }
      });
    } else {
      this.infoToaster('Select Your Name');
    }
  }

  public rejectDetection() {
    console.log('rejected detection', );
    console.log('emp', this.empRecord);
    const startTime = Utils.getStartTimeStampOfGivenDate(this.todaysDate);
    const endTime = Utils.getCurrentTimeStampOfGivenDate( this.todaysDate );
    console.log('name', this.empRecord.name, 'starttime', startTime, 'endTime', endTime);
    this.apiService.rejectEmpAttendance({start_time: startTime, end_time: endTime, awi_label: this.empRecord.name})
      .subscribe(
        response => {
          console.log('rejectDatarespone' , response);
          if ( response.success ) {
            this.successToaster(response.msg);
            this.initForm();
            this.showNextPersonInTheQueue();

          } else {
            this.errorToaster(response.msg);
          }
        }
      );
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
        name: {
          name: '',
          id: 0
        },
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

  infoToaster(message: string) {
    this.notifyService.showInfo(message,  '');
  }
}
