type Role = "student" | "teacher" | "admin";

export default interface User {
    id: number;
    name: string;
    password: string;
    role: Role;
    emailkey?: string;
    classes: number[];
}
