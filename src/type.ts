export interface Users {
  name?: string;
  avatar?: string;
}
export interface Colleges {
  name?: string;
  code?: string;
  field: AllFields;
}
export interface Departments {
  name?: string;
  code?: string;
  _college?: Colleges;
}
export interface Test {
  field?: boolean;
  field1?: "one" | "two" | "three";
  field2?: any;
  field3?: string;
}
export interface AllFields {
  field?: number;
  field1?: string;
  field2?: Date;
  field3?: any;
}
