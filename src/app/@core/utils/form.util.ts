import { FormGroup } from '@angular/forms';

export function areFormControlsValid(form: FormGroup, fields: string[]) {
  const valids = fields.map(field => form.get(field).valid).filter(x => x);
  return valids.length === fields.length;
}

export function isInvalidControl(form:FormGroup, field_name:string): boolean {
    let control = form.get(field_name);    
    return control.invalid && (control.dirty || control.touched)
}