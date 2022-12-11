export interface Users {
  name?: string;
  avatar?: string;
  role: "student" | "teacher" | "departmentAdmin" | "collegeAdmin" | "guest";
  code: string;
  expand: {
    department?: Departments;
    "colleges(admin)"?: Colleges[];
    "departments(admin)"?: Departments[];
    "attendances(student)"?: Attendances[];
  };
}
export interface Colleges {
  name: string;
  code: string;
  expand: {
    admin?: Users;
    "departments(college)"?: Departments[];
  };
}
export interface Departments {
  name: string;
  code: string;
  expand: {
    admin?: Users;
    college?: Colleges;
    "users(department)"?: Users[];
    "classes(department)"?: Classes[];
  };
}
export interface Classes {
  name: string;
  code: string;
  expand: {
    department?: Departments;
    "attendances(class)"?: Attendances[];
  };
}
export interface Attendances {
  present?: boolean;
  expand: {
    class?: Classes;
    student?: Users;
  };
}
export const Collections = {
  Users: "users",
  Colleges: "colleges",
  Departments: "departments",
  Classes: "classes",
  Attendances: "attendances",
};
