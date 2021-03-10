import {
  AbstractControl,
  AsyncValidatorFn,
  FormGroup,
  ValidatorFn,
  ValidationErrors,
  Validators,
  FormArray,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, switchMap, take } from 'rxjs/operators';
import * as _ from 'lodash';
import { RestService } from '../rest.service';
import * as moment from 'moment';

export class FormValidator {
  static isRequired(label: string = ''): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid =
        control.value !== null &&
        control.value.toString().trim().length > 0 &&
        control.value !== undefined;
      const message = label ? `${label} is required` : `is required`;
      return isValid ? null : { isRequired: { valid: false, value: control.value, message } };
    };
  }

  static minLength(minLength: number, label: string = ''): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (
        control.value === null ||
        control.value === undefined ||
        control.value.toString().length === 0
      ) {
        return null;
      }
      const message = label
        ? `${label} should be greater than ${minLength} characters`
        : `should be greater than ${minLength} characters`;
      const isValid = control.value.toString().trim().length >= minLength;
      return isValid ? null : { minLength: { valid: false, value: control.value, message } };
    };
  }

  static maxLength(maxLength: number, label: string = ''): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (
        control.value === null ||
        control.value === undefined ||
        control.value.toString().length === 0
      ) {
        return null;
      }
      const message = label
        ? `${label} should be less than ${maxLength} characters`
        : `should be less than ${maxLength} characters`;
      const isValid = control.value.toString().trim().length <= maxLength;
      return isValid ? null : { maxLength: { valid: false, value: control.value, message } };
    };
  }

  static positiveValue(label: string = ''): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (
        control.value === null ||
        control.value === undefined ||
        control.value.toString().length === 0
      ) {
        return null;
      }
      const isValid = control.value >= 0;
      const message = label ? `${label} should be positive number` : `should be positive number`;
      return isValid ? null : { positiveValue: { valid: false, value: control.value, message } };
    };
  }

  static isValidEmail(label: string = ''): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (
        control.value === null ||
        control.value === undefined ||
        control.value.toString().length === 0
      ) {
        return null;
      }
      if (control.value.trim().includes(' ')) {
        return { isValidEmail: { value: control.value } };
      }
      // tslint:disable-next-line:max-line-length
      const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      const isValid = emailRegex.test(control.value);
      const message = label ? `${label} should be valid email` : `should be valid email`;
      return isValid ? null : { isValidEmail: { valid: false, value: control.value, message } };
    };
  }

  static maxValue(maxValue: number, label: string = ''): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (
        control.value === null ||
        control.value === undefined ||
        control.value.toString().length === 0
      ) {
        return null;
      }
      if (control.value < 0) {
        return { maxValue: { value: control.value } };
      }
      const isValid = control.value <= maxValue;
      const message = label
        ? `${label} should be less than ${maxValue}`
        : `should be less than ${maxValue}`;
      return isValid ? null : { maxValue: { valid: false, value: control.value, message } };
    };
  }

  static minValue(minValue: number, label: string = ''): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (
        control.value === null ||
        control.value === undefined ||
        control.value.toString().length === 0
      ) {
        return null;
      }
      if (control.value < 0) {
        return { minValue: { value: control.value } };
      }
      const isValid = control.value >= minValue;
      const message = label
        ? `${label} should be greater than ${minValue}`
        : `should be greater than ${minValue}`;
      return isValid ? null : { minValue: { valid: false, value: control.value, message } };
    };
  }

  static CheckValidString(label: string = ''): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = control.value.trim().length !== 0;
      const message = label ? `${label} is required` : `is required`;
      return isValid ? null : { CheckValidString: { valid: false, value: control.value, message } };
    };
  }

  static isValidURL(allowEmpty: boolean = false, label: string = ''): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (
        control.value === null ||
        control.value === undefined ||
        control.value.toString().length === 0
      ) {
        return null;
      }
      // tslint:disable-next-line:max-line-length
      if (allowEmpty && control.value.toString().length > 0 && control.value.trim().length === 0) {
        return { isValidURL: { value: control.value } };
      }
      // tslint:disable-next-line: max-line-length
      const urlRegex = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;
      const isValid = urlRegex.test(control.value);
      const message = label
        ? `${label} should be valid website url`
        : `should be valid website url`;
      return isValid ? null : { isValidURL: { valid: false, value: control.value, message } };
    };
  }

  static isInRange(min: number, max: number, label: string = ''): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (
        control.value === null ||
        control.value === undefined ||
        control.value.toString().length === 0
      ) {
        return null;
      }
      let isValid: boolean;
      if ((min === null || min === undefined) && (max === null || max === undefined)) {
        return null;
      } else if (!min && max) {
        isValid = control.value <= max;
      } else if (min && !max) {
        isValid = min <= control.value;
      } else {
        isValid = min <= control.value && control.value <= max;
      }
      const message = label
        ? `${label} should be between ${min} and ${max}`
        : `should be between ${min} and ${max}`;
      return isValid ? null : { isInRange: { valid: false, value: control.value, message } };
    };
  }

  static isInDateRange(start: string, end: string, label: string = ''): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const startDate = moment(start, 'DD/MM/YYYY').startOf('day');

      const endDate = moment(end, 'DD/MM/YYYY').endOf('day');

      const isValid = moment(control.value).isBetween(startDate, endDate);

      const message = label
        ? `${label} should be between ${start} and ${end}`
        : `should be between ${start} and ${end}`;
      return isValid ? null : { isInDateRange: { valid: false, value: control.value, message } };
    };
  }

  static isAfterDate(date: string, label: string = ''): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const startDate = moment(date, 'DD/MM/YYYY').startOf('day');

      const isValid = moment(control.value).isAfter(startDate);

      const message = label ? `${label} should be after  ${date}` : `should be after  ${date}`;
      return isValid ? null : { isAfterDate: { valid: false, value: control.value, message } };
    };
  }

  static isSameOrAfterDate(date: string, label: string = ''): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const startDate = moment(date, 'DD/MM/YYYY').startOf('day');

      const isValid = moment(control.value).isSameOrAfter(startDate);

      const message = label
        ? `${label} should be same or after ${date}`
        : `should be same or after ${date}`;
      return isValid
        ? null
        : { isSameOrAfterDate: { valid: false, value: control.value, message } };
    };
  }

  static isBeforeDate(date: string, label: string = ''): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const endDate = moment(date, 'DD/MM/YYYY').endOf('day');

      const isValid = moment(control.value).isBefore(endDate);

      const message = label ? `${label} should be before  ${date}` : `should be before ${date}`;
      return isValid ? null : { isBeforeDate: { valid: false, value: control.value, message } };
    };
  }

  static isValidAppName(restService: RestService): AsyncValidatorFn {
    return (
      control: AbstractControl,
    ): Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> => {
      if (
        control.value === undefined ||
        control.value === null ||
        control.value.trim().length === 0 ||
        control.value.replace(/ +(?= )/g, '').length < 3
      ) {
        return of(null);
      }
      return control.valueChanges.pipe(
        debounceTime(500),
        take(1),
        switchMap(() =>
          restService.fetch(`/api/apps/name/${control.value.trim().replace(/ +(?= )/g, '')}`).pipe(
            map(response => {
              const isAppNameAvailable = _.get(response, 'data.isAppNameAvailable', '');
              return isAppNameAvailable ? null : { isValidAppName: true };
            }),
          ),
        ),
      );
    };
  }

  static isNotEqualToZero(label: string = '') {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = control.value === null || control.value === undefined || control.value !== 0;
      const message = label ? `${label} should not equal to zero` : `should not equal to zero`;
      return isValid ? null : { isNotEqualToZero: { valid: false, value: control.value, message } };
    };
  }

  static restrictWhiteSpace(event) {
    const startPosition = event.currentTarget.selectionStart;
    if (!event.target.value) {
      if (event.keyCode === 32) {
        return false;
      }
    } else {
      if (event.which === 32 && startPosition === 0) {
        return false;
      }
    }
  }

  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    } else if (control && control.value && !control.value.replace(/\s/g, '').length) {
      return { cannotContainSpace: true };
    }
    return null;
  }

  static isLengthInRange(minLength: number, maxLength: number, label: string = ''): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let isValid: boolean;
      if (
        (minLength === null || minLength === undefined) &&
        (maxLength === null || maxLength === undefined)
      ) {
        return null;
      }
      if (
        control.value === null ||
        control.value === undefined ||
        control.value.trim().length === 0
      ) {
        return null;
      }

      const valueLength = control.value.toString().trim().length;
      if (!minLength && !maxLength) {
        return null;
      } else if (minLength && maxLength) {
        isValid = valueLength >= minLength && valueLength <= maxLength;
      } else if (minLength && !maxLength) {
        isValid = valueLength >= minLength;
      } else if (maxLength && !minLength) {
        isValid = valueLength <= maxLength;
      }

      const message = label
        ? `${label} should be between ${minLength} and ${maxLength} characters`
        : `should be between ${minLength} and ${maxLength} characters`;
      return isValid ? null : { isLengthInRange: { valid: false, value: control.value, message } };
    };
  }

  static isMaxGreaterThanMin(minValue: number, allowedSame: boolean = false, label: string = '') {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!minValue || minValue === null || minValue === undefined) {
        return null;
      }

      if (control.value === null || control.value === undefined || control.value === '') {
        return null;
      }

      if (allowedSame) {
        const messageSame = label
          ? `${label} should be greater than or equal to ${minValue}`
          : `should be greater than or equal to ${minValue}`;
        return control.value >= minValue
          ? null
          : { isMaxGreaterThanMin: { valid: false, value: control.value, messageSame } };
      }
      const message = label
        ? `${label} should be greater than ${minValue}`
        : `should be greater than ${minValue}`;
      return control.value > minValue
        ? null
        : { isMaxGreaterThanMin: { valid: false, value: control.value, message } };
    };
  }

  static isMinLesserThanMax(
    maxValue: AbstractControl,
    allowedSame: boolean = false,
    label: string = '',
  ) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!maxValue || maxValue === null || maxValue === undefined) {
        return null;
      }

      if (control.value === null || control.value === undefined || control.value === '') {
        return null;
      }

      if (allowedSame) {
        const messageSame = label
          ? `${label} should be lesser than or equal to ${maxValue}`
          : `should be lesser than or equal to ${maxValue}`;
        return control.value <= maxValue
          ? null
          : { isMinLesserThanMax: { valid: false, value: control.value, messageSame } };
      }

      const message = label
        ? `${label} should be lesser than ${maxValue}`
        : `should be lesser than ${maxValue}`;

      return control.value < maxValue
        ? null
        : {
            isMinLesserThanMax: {
              valid: false,
              value: control.value,
              message,
            },
          };
    };
  }

  static isInRangeForm(min: string, max: string, control: string, label: string = ''): ValidatorFn {
    return (form: FormGroup): { [key: string]: any } | null => {
      const minValue = Number(form.get(min).value);
      const maxValue = Number(form.get(max).value);
      const controlValue = form.get(control).value;

      if (
        (minValue === null || minValue === undefined) &&
        (maxValue === null || maxValue === undefined)
      ) {
        return null;
      }

      if (
        controlValue === null ||
        controlValue === undefined ||
        controlValue.toString().length === 0
      ) {
        return null;
      }

      let isValid: boolean;

      if (!min && max) {
        isValid = controlValue <= maxValue;
      } else if (min && !max) {
        isValid = minValue <= controlValue;
      } else {
        isValid = minValue <= controlValue && controlValue <= maxValue;
      }

      let message;
      if (minValue === maxValue) {
        message = label ? `${label} should be ${maxValue}` : `should be ${maxValue}`;
      } else {
        message = label
          ? `${label} should be between ${minValue} and ${maxValue}`
          : `should be between ${minValue} and ${maxValue}`;
      }
      return isValid ? null : { isInRange: { valid: false, value: controlValue, message } };
    };
  }

  static isLengthInRangeForm(
    min: string,
    max: string,
    control: string,
    label: string = '',
  ): ValidatorFn {
    return (form: FormGroup): { [key: string]: any } | null => {
      const minLength = Number(form.get(min).value);
      const maxLength = Number(form.get(max).value);
      const controlValue = form.get(control).value;

      if (
        (minLength === null || minLength === undefined) &&
        (maxLength === null || maxLength === undefined)
      ) {
        return null;
      }

      if (controlValue === null || controlValue === undefined || controlValue === '') {
        return null;
      }

      let isValid: boolean;

      const valueLength = controlValue.toString().trim().length;

      if (minLength && maxLength) {
        isValid = valueLength >= minLength && valueLength <= maxLength;
      } else if (minLength && !maxLength) {
        isValid = valueLength >= minLength;
      } else if (maxLength && !minLength) {
        isValid = valueLength <= maxLength;
      }

      let message;
      if (maxLength === minLength) {
        message = label
          ? `${label} should be ${maxLength} characters`
          : `should be ${maxLength} characters`;
      } else {
        message = label
          ? `${label} should be between ${minLength} and ${maxLength} characters`
          : `should be between ${minLength} and ${maxLength} characters`;
      }
      return isValid ? null : { isLengthInRange: { valid: false, value: controlValue, message } };
    };
  }

  static isMaxGreaterThanMinForm(
    min: string,
    max: string,
    allowedSame: boolean = false,
    label: string = '',
  ) {
    return (form: FormGroup): { [key: string]: any } | null => {
      const minValue = form.get(min).value;
      const maxValue = form.get(max).value;

      if (!minValue || minValue === null || minValue === undefined) {
        return null;
      }

      if (maxValue === null || maxValue === undefined || maxValue === '') {
        return null;
      }

      if (allowedSame) {
        const messageSame = label
          ? `${label} should be greater than or equal to ${minValue}`
          : `should be greater than or equal to ${minValue}`;
        return maxValue >= minValue && minValue !== 0 && maxValue !== 0
          ? null
          : { isMaxGreaterThanMin: { valid: false, value: maxValue, message: messageSame } };
      }

      const message = label
        ? `${label} should be greater than ${minValue}`
        : `should be greater than ${minValue}`;

      form.controls[max].setErrors({
        isMaxGreaterThanMin: {
          valid: false,
          value: maxValue,
          message,
        },
      });
      form.get(max).updateValueAndValidity({ onlySelf: true });

      console.log('valid : ', maxValue > minValue);

      return maxValue > minValue
        ? null
        : { isMaxGreaterThanMin: { valid: false, value: maxValue, message } };
    };
  }

  static isMinLesserThanMaxForm(
    min: string,
    max: string,
    allowedSame: boolean = false,
    label: string = '',
  ) {
    return (form: FormGroup): { [key: string]: any } | null => {
      const minValue = form.get(min).value;
      const maxValue = form.get(max).value;

      if (!minValue || minValue === null || minValue === undefined) {
        return null;
      }

      if (maxValue === null || maxValue === undefined || maxValue === '') {
        return null;
      }

      if (allowedSame) {
        const messageSame = label
          ? `${label} should be lesser than or equal to ${maxValue}`
          : `should be lesser than or equal to ${maxValue}`;
        return minValue <= maxValue && minValue !== 0 && maxValue !== 0
          ? null
          : { isMinLesserThanMax: { valid: false, value: minValue, message: messageSame } };
      }

      const message = label
        ? `${label} should be lesser than ${maxValue}`
        : `should be lesser than ${maxValue}`;
      return minValue < maxValue
        ? null
        : {
            isMinLesserThanMax: {
              valid: false,
              value: minValue,
              message,
            },
          };
    };
  }

  static isInDateRangeForm(
    start: string,
    end: string,
    initial: string,
    label: string = '',
    format: string = 'DD MM YYYY',
  ): ValidatorFn {
    return (form: FormGroup): { [key: string]: any } | null => {
      if (
        form.get(start).value === null ||
        form.get(start).value === undefined ||
        form
          .get(start)
          .value.toString()
          .trim().length === 0
      ) {
        return;
      }

      if (
        form.get(end).value === null ||
        form.get(end).value === undefined ||
        form
          .get(end)
          .value.toString()
          .trim().length === 0
      ) {
        return;
      }

      if (
        form.get(initial).value === null ||
        form.get(initial).value === undefined ||
        form
          .get(initial)
          .value.toString()
          .trim().length === 0
      ) {
        return;
      }

      const startDate = moment(form.get(start).value).startOf('day');
      const endDate = moment(form.get(end).value).endOf('day');
      const initialDate = moment(form.get(initial).value).endOf('day');
      const isValid = moment(initialDate).isBetween(startDate, endDate);

      const message = label
        ? `${label} should be between ${startDate.format(format)} and ${endDate.format(format)}`
        : `should be between ${startDate.format(format)} and ${endDate.format(format)}`;
      return isValid
        ? null
        : { isInDateRange: { valid: false, value: form.get(initial).value, message } };
    };
  }

  static isEndDateAfterStartDateForm(
    start: string,
    end: string,
    label: string = '',
    format: string = 'DD MM YYYY',
  ): ValidatorFn {
    return (form: FormGroup): { [key: string]: any } | null => {
      if (
        form.get(start).value === null ||
        form.get(start).value === undefined ||
        form
          .get(start)
          .value.toString()
          .trim().length === 0
      ) {
        return;
      }

      if (
        form.get(end).value === null ||
        form.get(end).value === undefined ||
        form
          .get(end)
          .value.toString()
          .trim().length === 0
      ) {
        return;
      }

      const startDate = moment(form.get(start).value).startOf('day');
      const endDate = moment(form.get(end).value).endOf('day');

      const isValid = moment(endDate).isAfter(startDate);

      const message = label
        ? `${label} should be after  ${startDate.format(format)}`
        : `should be after  ${startDate.format(format)}`;
      return isValid
        ? null
        : { isEndDateAfterStartDate: { valid: false, value: form.get(end).value, message } };
    };
  }

  static isStartDateBeforeEndDateForm(
    start: string,
    end: string,
    label: string = '',
    format: string = 'DD MM YYYY',
  ): ValidatorFn {
    return (form: FormGroup): { [key: string]: any } | null => {
      if (
        form.get(start).value === null ||
        form.get(start).value === undefined ||
        form
          .get(start)
          .value.toString()
          .trim().length === 0
      ) {
        return;
      }

      if (
        form.get(end).value === null ||
        form.get(end).value === undefined ||
        form
          .get(end)
          .value.toString()
          .trim().length === 0
      ) {
        return;
      }

      const startDate = moment(form.get(start).value).startOf('day');
      const endDate = moment(form.get(end).value).endOf('day');

      const isValid = moment(startDate).isBefore(endDate);

      const message = label
        ? `${label} should be before  ${endDate.format(format)}`
        : `should be before ${endDate.format(format)}`;
      return isValid
        ? null
        : { isStartDateBeforeEndDate: { valid: false, value: form.get(start).value, message } };
    };
  }

  // custom validator to check that two fields match
  static MustMatch(controlName: string, matchingControlName: string) {
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
    };
  }

  static validateEmails(emails: string) {
    return (
      emails
        .split(',')
        .map(email => Validators.email(<AbstractControl>{ value: email }))
        .find(_ => _ !== null) === undefined
    );
  }

  static emailsValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value === '' || !control.value || FormValidator.validateEmails(control.value)) {
      return null;
    }
    return { emails: true };
  }
  public static mustMisMatch(): ValidatorFn | null {
    return (control: FormArray): { [key: string]: any } | null => {
      let values = [];
      let isMatched: boolean = false;
      if (control.controls.length) {
        control.controls.forEach(control => {
          if (!!control.value.option.trim() && values.includes(control.value.option.trim())) {
            isMatched = true;
          } else {
            values.push(control.value.option.trim());
          }
        });
      }
      return isMatched ? { isMatched: { valid: false } } : null;
    };
  }
}

// matchingControlName value should be less than controlName value
export function lessThenEqualTo(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (Number(control.value) < Number(matchingControl.value)) {
      matchingControl.setErrors({ lessThan: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
