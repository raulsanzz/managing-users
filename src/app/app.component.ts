import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public listData: any[] = [];
  public listsData: any[] = [];
  public addBtntext: any;
  public todoTitle: any;
  public globalIndex: any;
  form = new FormGroup({
    "firstName": new FormControl("", Validators.required),
    "lastName": new FormControl("", Validators.required),
    "email": new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    "status": new FormControl("", Validators.required),
    "role": new FormControl("", Validators.required),
  });


/**
 * 
 * @param toastr
 */
  constructor(private toastr: ToastrService) {
 
    this.listData = [];
    this.listsData = [];
    this.addBtntext = "Add Todo";
    this.todoTitle = "Add Todo"
  }
  /**
   * 
   * @param onSubmit 
   * 
   */
  onSubmit() { 
    if (this.addBtntext === "Update Todo") {
      const arr = this.listsData;


      const newArr = arr.map((object, index) => {
        console.log(object);
        if (index == this.globalIndex) {
          return { ...object, firstName: this.form.value.firstName, lastName: this.form.value.lastName, email: this.form.value.email, status: this.form.value.status, role: this.form.value.role };
        }
        return object;
      });
      console.log(newArr);
      this.listsData = newArr;
      this.toastr.success('Updated Successfully!', 'Updated!');
      this.form.patchValue({ firstName: " ", lastName: " ", email: " ", status: " ", role: "", });
      this.addBtntext = "Add Todo";
      this.todoTitle = "Add Todo"
    }
    else {

      let arr = this.listsData;
      let value = this.form.value;

      let obj = arr.find(o => o.email === this.form.value.email);

      if (obj) {
        this.toastr.error('Duplicate Email Found!', 'Duplicate!');
      }
      else {
        this.toastr.success('Todo Added Successfully!', 'Added!');
        this.listData.push(value);
        this.listsData = this.listData;
        console.log(this.listData);
      }
    }

  }
  /**
   * 
   * @param updateItem 
   * 
   */
  updateItem(element: any) {
    this.addBtntext = "Update Todo";
    this.todoTitle = "Update Todo"
    this.listData.forEach((value, index) => {
      if (value == element) {
        console.log(value, element);
        this.form.patchValue({ firstName: value.firstName, lastName: value.lastName, email: value.email, status: value.status, role: value.role, });
        console.log(index);
        this.globalIndex = index;
      }

    });
  }
  /**
   * 
   * @param removeItem 
   * 
   */
  removeItem(element: any) {
    this.listsData.forEach((value, index) => {
      if (value == element) this.listsData.splice(index, 1);
      this.form.patchValue({ firstName: " ", lastName: " ", email: " ", status: " ", role: "", });
      this.addBtntext = "Add Todo";
      this.todoTitle = "Add Todo"
      this.toastr.error('Deleted Successfully!', 'Deleted!');
    });
  }

}
