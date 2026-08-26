export interface SyllabusFile {
  course: string;
  title: string;
  instructor: string;
  filename: string;
}

export const syllabi: SyllabusFile[] = [
  {
    course: "MCY 121",
    title: "Hip-Hop History, Culture, and Globalization",
    instructor: "Dr. Brent Swanson",
    filename: "MCY_121-T_Syllabus_FLL_26.pdf",
  },
  {
    course: "STC 116",
    title: "Principles of Public Relations",
    instructor: "Prof. Weiting Tao",
    filename: "STC_116_Fall_2026_Syllabus.pdf",
  },
  {
    course: "ISE 441",
    title: "Operations Research and Optimization Methods",
    instructor: "Dr. Ramin Moghaddas",
    filename: "IEN_441_Syllabus_Fall26.pdf",
  },
  {
    course: "ISE 380",
    title: "Engineering Economic Analysis",
    instructor: "Dr. Nina Miville",
    filename: "Course_Objectives_Fall_2026_ISE_380.docx",
  },
  {
    course: "ISE 310",
    title: "Introduction to Engineering Probability",
    instructor: "Dr. Adam Meyers",
    filename: "ISE310_Syllabus_Fall2026.pdf",
  },
  {
    course: "GEG 204",
    title: "Global Economics",
    instructor: "Prof. Haoluan Wang",
    filename: "INS102_Syllabus_Fall2026.pdf",
  },
];
