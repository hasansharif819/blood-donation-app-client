export type bloodGroups = [
  "A_POSITIVE",
  "A_NEGATIVE",
  "B_POSITIVE",
  "B_NEGATIVE",
  "AB_POSITIVE",
  "AB_NEGATIVE",
  "O_POSITIVE",
  "O_NEGATIVE"
];

export interface IPost {
  id: string;
  name: string;
  email: string;
  location: string;
  profilePhoto: string;
  address: string;
  city: string;
  bloodType: bloodGroups;
}
