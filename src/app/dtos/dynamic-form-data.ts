import { DynamicFormSection } from './dynamic-form-section';

export interface DynamicFormData {
  title: string;
  sections: DynamicFormSection[];
  record: any;
}
