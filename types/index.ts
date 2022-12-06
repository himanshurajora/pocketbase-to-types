export interface Users {
  name?: string;
  avatar?: string;
  expand: {};
}
export interface Colleges {
  name?: string;
  code?: string;
  expand: {
    field: Test;
    "departments(_college)": Departments;
  };
}
export interface Departments {
  name?: string;
  code?: string;
  expand: {
    _college: Colleges;
    "test(department)": Test;
  };
}
export interface Test {
  field?: boolean;
  field1?: "one" | "two" | "three";
  field2?: any;
  field3?: string;
  expand: {
    department: Departments;
    "colleges(field)": Colleges;
  };
}
export interface AllFields {
  field?: number;
  field1?: string;
  field2?: Date;
  field3?: any;
  expand: {};
}
