import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl,Validator, Validators} from '@angular/forms';
import { Hardware } from 'src/app/models/hardware';
import { HardwareService } from 'src/app/services/hardware.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.css']
})

export class HardwareComponent implements OnInit {
  //Arreglo donde va a caer toda la informacion de mongoDB que yo voy a  consumir del API
  listOfHardware:Hardware[]=[];
  visible = false;
  form!: FormGroup;
  accion:boolean=true;
  idModificar:string='';
  
  constructor(
    private hardwareService:HardwareService,
    private nzMessageService:NzMessageService,
    private formBuilder:FormBuilder
  ) {
    this.buildForm();
   }

  private buildForm(){
    this.form =this.formBuilder.group({
      fabricante : [''],
      modelo : [ ''],
      serviceTag : [''],
      ram : [null],
      procesadorMarca : [''],
      procesadorGeneracion : [null],
      procesadorFq : [null],
      cacheL1 : [null],
      cacheL2 : [null],
      cacheL3 : [null],
      discoDuro : [null],
      discoDuroUnidad : [''],
      pantalla : [null],
      color : ['']
    });
  }

  ngOnInit(): void {  
    this.hardwareService.getAllHardware().toPromise().then(
      ( data: Hardware[])=> this.listOfHardware = data
    )
  }

  delete(id:string){
    this.hardwareService.deleteHardware(id).toPromise().then(()=>{
      this.nzMessageService.warning('El registro fue eliminado con exito!');
      this.listOfHardware = this.listOfHardware.filter(x=>x.id!==id);
    },(error)=>{
      this.nzMessageService.error('El registro no pudo ser eliminado, por favor intente de nuevo');
      console.error(error);
    })
  }

  cancel():void{
    this.nzMessageService.info('Su registro sigue activo! =D')
  }

  open():void{
    this.visible = true;
    this.accion=true;
  }

  close(): void {
    this.visible = false;
    this.buildForm();
  }

  guardar(): void {
    if (this.accion) {
      this.hardwareService.postHardware(this.form.value).toPromise().then((data: any) => {
        //this.listOfHardware.push(data);
        this.nzMessageService.success('El registro fue ingresado con exito!');
        this.listOfHardware = [...this.listOfHardware, data]
        //Limpia el formulario y lo cierra
        this.buildForm();
        this.visible = false;
      }, (error) => {
        this.nzMessageService.error('El registro no pudo ser ingresado, por favor intente de nuevo');
        console.error(error);
      })
    }else{
      this.hardwareService.putHardware(this.idModificar,this.form.value).toPromise().then(()=>{
        for(let elemento of this.listOfHardware.filter(x=>x.id===this.idModificar)){
          elemento.fabricante=this.form.value.fabricante;
          elemento.modelo= this.form.value.modelo;
          elemento.serviceTag= this.form.value.serviceTag;
          elemento.ram= this.form.value.ram;
          elemento.procesadorMarca=this.form.value.procesadorMarca;
          elemento.procesadorGeneracion=this.form.value.procesadorGeneracion;
          elemento.procesadorFq=this.form.value.procesadorFq;
          elemento.cacheL1=this.form.value.cacheL1;
          elemento.cacheL2=this.form.value.cacheL2;
          elemento.cacheL3=this.form.value.cacheL3;
          elemento.discoDuro=this.form.value.discoDuro;
          elemento.discoDuroUnidad=this.form.value.discoDuroUnidad;
          elemento.pantalla=this.form.value.pantalla;
          elemento.color=this.form.value.color;
        }
        this.visible = false;
        this.nzMessageService.success('El registro fue actualizado con exito!');
      }, (error) => {
        this.nzMessageService.error('El registro no pudo ser actualizado, por favor intente de nuevo');
        console.error(error);
      })
    }
  }

  modificar(item:Hardware):void{
    this.accion=false;
    this.idModificar=item.id;
    this.visible = true;
    this.form=this.formBuilder.group({
      fabricante: [item.fabricante],
      modelo: [item.modelo],
      serviceTag: [item.serviceTag],
      ram: [item.ram],
      procesadorMarca: [item.procesadorMarca],
      procesadorGeneracion: [item.procesadorGeneracion],
      procesadorFq: [item.procesadorFq],
      cacheL1: [item.cacheL1],
      cacheL2: [item.cacheL2],
      cacheL3: [item.cacheL3],
      discoDuro: [item.discoDuro],
      discoDuroUnidad: [item.discoDuroUnidad],
      pantalla: [item.pantalla],
      color: [item.color]
    })
  }

  submitForm(): void {
    for (const i in this.form?.controls) {
      this.form?.controls[i].markAsDirty();
      this.form?.controls[i].updateValueAndValidity();
    }
  }

}
