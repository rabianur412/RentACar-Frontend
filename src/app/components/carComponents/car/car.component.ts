import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car-detail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  carDetails:CarDetail[]=[];
  
  dataLoaded=false;
  imageBasePath = 'https://localhost:44332/';
  defaultImg="/images/default.jpg"
  filterText="";  

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService) { }//Http clienti kullanabilmek için onu enjekte etmemiz gerekiyor

  ngOnInit(): void {//bu bizim componenentimizin ilk kez çalıştığı yer
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"])
      {
        this.getCarsByBrand(params["brandId"]);
      }
      else if(params["colorId"])
      {
        this.getCarsByColor(params["colorId"]);
      }
      else if(params["brandId"] && params["colorId"])
      {
        this.getCarDetailsColorAndBrand(params["brandId"],params["colorId"]);
      }
      else
      {
        this.getCars();
      }
    
    })
    
  }
  getCars()
  {
     this.carService.getCars().subscribe(response=>
     {
       this.carDetails=response.data
       console.log(response);
       this.dataLoaded=true;
     })
  }
  getCarsByBrand(brandId:number)
  {
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.carDetails=response.data;
      this.dataLoaded=true;
    })
  }
  getCarsByColor(colorId:number)
  {
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.carDetails=response.data;
      this.dataLoaded=true;
    })
  }
  getCarDetailsColorAndBrand(brandId:number,colorId:number)
  {
    this.carService.getCarDetailsColorAndBrand(brandId,colorId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  
}
