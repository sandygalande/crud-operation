import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../common.service';
declare var $:any

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: any;
  users: any;

  constructor(public fb:FormBuilder,private service:CommonService,) { 
    this.userForm = this.fb.group({
      ProductName:[""],
      ProductID:[""],
      CategoryName:[""],
      CategoryID:[""],
    })
  }

  ngOnInit(): void {
    this.GetAllUsers();
  }

  SubmitForm(){
    var type=this.userForm.id==null?'Add':'Update';
    
    this.service.AddUpdateUser(this.userForm.value,type).subscribe((data: any)=>{
      if(type=='Add'){
        alert("Added");
      }else{
        alert("Updated");
      }
     
      this.userForm.reset();
      this.GetAllUsers();
      console.log(data);
    })
  }
  GetAllUsers(){
    this.service.GetAllUsers().subscribe(data=>{
      console.log('Users',data);
      this.users = data;
    })
  }
  DeleteUserByID(ID:any){
    this.service.DeleteUserByID(ID).subscribe(data=>{
      alert("User Deleted")
      this.GetAllUsers();
    })
  }
  GetUserByID(ID:any){
    this.service.DeleteUserByID(ID).subscribe(data=>{
      alert("get user successfully")
      console.log("user details",data);
       $("#home").addClass('show')
       $("#home").addClass('active')

       $("#profile").removeClass('show')
       $("#profile").removeClass('active')
      this.userForm.patchvalue({
        ProductName:data.ProductName,
        ProductID:data.ProductID,
        CategoryName:data.CategoryName,
        CategoryID:data.CategoryID,

      })
    })
  }

}
