import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PersonDataService } from '../../services/person-data.service';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  public empRecord ;

  constructor(private apiService: ApiService, private personData: PersonDataService) { }

  ngOnInit() {
    this.sendMessage();
    this.checkNewPresentEmp();

    this.apiService.getNewEmpDetails().subscribe((res) => {
      this.empRecord = this.extractDataForNewEmp(res);
      console.log(this.empRecord);
     });
  }

  sendMessage() {
    console.log('sendms today');
    this.personData.sendMsg('Access Real Time Data from server');
  }

  private checkNewPresentEmp() {
    this.personData.messages.subscribe(data => {
      console.log('data', data);
    });
  }

  private extractDataForNewEmp(res) {

    const row = {name: null, inTime: null, outTime: null, location: null, department: null , photo: null,  id: 0};
    const dynamicKey = res.data.awi_facial_recognition.awi_app_data.awi_blobs.awi_blob_ids[0];

    row.department = res.data.awi_facial_recognition.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_subclass;

    row.inTime = res.data.timestamp;
    row.outTime = res.data.timestamp;
    row.location = res.data.awi_facial_recognition.location;

    row.name = res.data.awi_facial_recognition.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_label;

    row.id = res.data.awi_facial_recognition.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_id;
    return row;
  }

}
