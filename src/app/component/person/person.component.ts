import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PersonDataService } from '../../services/person-data.service';
import PresentEmployeeListModel from '../../models/present-employee-list-model';
import PresentNewEmployeeModel from '../../models/present-new-employee-model';

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

  constructor(private apiService: ApiService, private personData: PersonDataService) { }

  ngOnInit() {
    this.startSocketConnection();
    this.initForm();

    this.startTime = new Date().setHours(0, 0, 0, 0);
    this.endTime = new Date().setHours(23, 59, 59, 999);

    this.apiService.getPresentEmployeesForDate({start_time: this.startTime, end_time: this.endTime })
    .subscribe(
      response => {
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
      console.log(data);
      const newPerson = PresentNewEmployeeModel.ModelMap(data).presentEmployee;
      // const newPerson = this.extractDataForNewEmp(data);
      // console.log('checknewperson' , newPerson);
      const index = this.empQueue.findIndex((e) => e.id === newPerson.id);

      if (index === -1 && newPerson.name !== 'Unrecognized') {
          this.empQueue.push(newPerson);
      } else {
          this.empQueue[index] = newPerson;
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
    // response for api service
    this.addToTheList(this.empRecord);
    this.initForm();
    this.showNextPersonInTheQueue();
  }

  public onSubmit() {
    console.log('Submitted');
    console.log(this.person);
    // response for api service
    this.addToTheList(this.empRecord);
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

}
