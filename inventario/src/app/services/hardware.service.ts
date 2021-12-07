import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hardware, HardwareWithoutID } from '../models/hardware';
import { environment } from 'src/environments/environment';

const API= environment.urlBackend;
const ENDPOINT = 'equipo-portatils';

@Injectable({
  providedIn: 'root'
})
export class HardwareService {

  constructor(
    private http: HttpClient
  ) { }

//CRUD
  getAllHardware(){
    return this.http.get<Hardware[]>(`${API}/${ENDPOINT}`)
  }
  
  //POST

  postHardware(hardware:HardwareWithoutID){

    return this.http.post(`${API}/${ENDPOINT}`,hardware);
    
  }

  //PUT

  putHardware(id:string,hardware:HardwareWithoutID ){
    return this.http.put(`${API}/${ENDPOINT}/${id}`,hardware);
  }

  //PATCH
  pathHardware(id:string,hardware:HardwareWithoutID ){
    return this.http.patch(`${API}/${ENDPOINT}/${id}`,hardware);
  }
  //DELETE

  deleteHardware(id:string,){
    return this.http.delete(`${API}/${ENDPOINT}/${id}`);
  }
}
