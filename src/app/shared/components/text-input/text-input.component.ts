import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() formControl!: FormControl; // Control de formulario
  @Input() label: string = ''; // Etiqueta
  @Input() type: string = 'text'; // Tipo
  @Input() placeholder: string = ''; // Marcador de posición
  @Input() requiredMessage: string = ''; // Mensaje requerido

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this; // Establecer el valor del control
  }
  /**
   *  Escribe un valor
   * @param obj  Objeto
   */
  writeValue(obj: any): void {
  }
  /**
   *  Registra una función
   * @param fn  Función
   */
  registerOnChange(fn: any): void {
  }
  /**
   *  Registra en tocado
   * @param fn Función
   */
  registerOnTouched(fn: any): void {
  }
  /**
   *  Establece el estado deshabilitado
   * @param isDisabled ¿Está deshabilitado?
   */
  setDisabledState?(isDisabled: boolean): void {
  }
  /**
   * Obtiene el control
   */
  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}
