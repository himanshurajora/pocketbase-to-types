export interface Users {
  name?: string;
  avatar?: string;
}
export interface Colleges {
  name?: string;
  code?: string;
}
export interface Departments {
  name?: string;
  code?: string;
  _college?: Colleges;
}
export interface Test {
  field?: any;
  field1?: any;
  field2?: any;
  field3?: any;
}
