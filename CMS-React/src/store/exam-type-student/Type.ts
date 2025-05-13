import { NullableString } from "types/Global";

export interface ExamTypeStudentModel {
    ID?: number;
    ExamTypeID?: number;
    TypeOfTopicSetsID?: number;
    UserID?: number;
    Content?: NullableString;
    ActiveDate?: NullableString;
  }