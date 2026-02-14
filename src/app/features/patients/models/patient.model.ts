export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: 'M' | 'F' | 'O'; // Male, Female, Other
  fiscalCode: string;
  email?: string; // Optional
  phone?: string; // Optional
}
