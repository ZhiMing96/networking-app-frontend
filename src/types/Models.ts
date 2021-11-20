import {Uuid} from './Utils';

export interface User {
  id: Uuid;
  firstName: string;
  lastName: string;
  emailAddress: string;
  profileImageUrl: string;
  shortDescription: string;
  longDescription: string;
  username: string;
  passwordHash: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  basedIn: Country;
}

export interface Country {
  name: string;
}

export enum VisibilityTypes {
  PUBLIC = 'PUBLIC',
  TARGETED = 'TARGETED',
  PRIVATE = 'PRIVATE',
}

export interface Post {
  id: Uuid;
  content: string;
  imageUrl: string;
  userId: Uuid;
  visibility: VisibilityTypes;
  createdAt: string;
  updatedAt: string;
  targetGroups: PostTargetGroup[];
  tags: PostTag[];
}

export interface PostTag {
  name: string;
}
export interface Occupation {
  name: string;
}
export interface Industry {
  name: string;
}

export enum SeniorityType {
  ENTRY = 'ENTRY',
  JUNIOR = 'JUNIOR',
  MID = 'MID',
  SENIOR = 'SENIOR',
  EXECUTIVE = 'EXECUTIVE',
  SENIOR_EXECUTIVE = 'SENIOR_EXECUTIVE',
}

export enum YearsOfExp {
  ENTRY = '0-1',
  JUNIOR = '1-3',
  MID = '3-6',
  SENIOR = '5-10',
  EXECUTIVE = '10-15',
  SENIOR_EXECUTIVE = '15-25',
}

export interface PostTargetGroup {
  id: Uuid;
  jobTitle: string;
  yearsOfExp: YearsOfExp;
  seniority: SeniorityType;
  postId: Uuid;
  occupationName: string;
  industryName: string;
  post: Post;
  occupation: Occupation;
  industry: Industry;
}
