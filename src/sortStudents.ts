export interface Student {
  name: string;
  surname: string;
  age: number;
  married: boolean;
  grades: number[];

}

export enum SortType {
  Name = 'name',
  Surname = 'surname',
  Age = 'age',
  Married = 'married',
  AverageGrade = 'grades',
}

export type SortOrder = 'asc' | 'desc';

const getAverageGrade = (grades: number[]): number => (
  grades.reduce((sum, grade) => sum + grade, 0) / grades.length);

export function sortStudents(
  students: Student[],
  sortBy: SortType,
  order: SortOrder,
): Student[] {
  const copyOFStudents: Student[] = [...students];

  copyOFStudents.sort((studentA: Student, studentB: Student) => {
    switch (sortBy) {
      case SortType.Name:
      case SortType.Surname:
        return order === 'asc'
          ? studentA[sortBy].localeCompare(studentB[sortBy])
          : studentB[sortBy].localeCompare(studentA[sortBy]);

      case SortType.Age:
      case SortType.Married:
        return order === 'asc'
          ? Number(studentA[sortBy]) - Number(studentB[sortBy])
          : Number(studentB[sortBy]) - Number(studentA[sortBy]);

      default:
        return order === 'asc'
          ? getAverageGrade(studentA[sortBy])
            - getAverageGrade(studentB[sortBy])
          : getAverageGrade(studentB[sortBy])
            - getAverageGrade(studentA[sortBy]);
    }
  });

  return copyOFStudents;
}
