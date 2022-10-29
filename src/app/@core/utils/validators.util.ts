import { FormArray, FormGroup } from '@angular/forms';
import * as moment from 'moment'
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {            
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function MustAfter(controlName: string, matchingControlName: string, baseDateControlName?:string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        let controlValue= control.value;
        let mathValue = matchingControl.value;
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        console.log(mathValue)

        // set error on matchingControl if validation fails
        if(baseDateControlName){
            const baseDate = formGroup.controls[baseDateControlName].value;            
            controlValue = moment(baseDate).hour(moment(control.value).hour()).minutes(moment(control.value).minutes());            
            mathValue= moment(baseDate).hour(moment(matchingControl.value).hour()).minutes(moment(matchingControl.value).minutes());
        }
        if (moment(controlValue).isBefore(moment(mathValue))) {            
            matchingControl.setErrors(null);
        } else {
            matchingControl.setErrors({ mustAfter: true });
            
        }
    }
}

export function AtleastOneValidator(arr:FormArray){
    let validCount = 0;
    arr.controls.forEach((form:FormGroup)=>{
      
      if(!form.invalid){
        let isFormBlank = false;
        Object.keys(form.controls).forEach(key => {
          if(form.get(key).value == '' && key !='photo' && key !='photoSource'){
            isFormBlank = true;          
          }
        });
        if(!isFormBlank) validCount++;
      }
        
    })
    return validCount >= 1 ? {atLeastOne:false} : {atLeastOne:true}
  }