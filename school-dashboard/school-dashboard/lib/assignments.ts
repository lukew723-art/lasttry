export type AssignmentType = "exam" | "quiz" | "assignment" | "project";

export interface AssignmentEvent {
  id: string;
  course: string;
  title: string;
  date: string; // YYYY-MM-DD
  note?: string;
  type: AssignmentType;
}

export const TYPE_STYLE: Record<AssignmentType, { bg: string; text: string; label: string }> = {
  exam: { bg: "bg-examRed/15", text: "text-examRed", label: "Exam" },
  quiz: { bg: "bg-quizBlue/15", text: "text-quizBlue", label: "Quiz" },
  assignment: { bg: "bg-accent/15", text: "text-accent", label: "Assignment" },
  project: { bg: "bg-projectGreen/15", text: "text-projectGreen", label: "Project" },
};

// Extracted directly from each course's Fall 2026 syllabus.
export const assignments: AssignmentEvent[] = [
  // MCY 121 — Hip-Hop History, Culture, and Globalization
  { id: "mcy-1", course: "MCY 121", title: "Listening Exam 1", date: "2026-09-10", type: "exam" },
  { id: "mcy-2", course: "MCY 121", title: "Album Review Due", date: "2026-09-30", type: "assignment" },
  { id: "mcy-3", course: "MCY 121", title: "Listening Exam 2", date: "2026-10-06", type: "exam" },
  { id: "mcy-4", course: "MCY 121", title: "Short Video Reflection 1 Due", date: "2026-10-21", type: "assignment" },
  { id: "mcy-5", course: "MCY 121", title: "Listening Exam 3", date: "2026-11-05", type: "exam" },
  { id: "mcy-6", course: "MCY 121", title: "Concert Review Due", date: "2026-11-18", type: "assignment" },
  { id: "mcy-7", course: "MCY 121", title: "Short Video Reflection 2 Due", date: "2026-11-20", type: "assignment" },
  { id: "mcy-8", course: "MCY 121", title: "Final Exam", date: "2026-12-03", note: "5:00–7:30 PM", type: "exam" },

  // STC 116 — Principles of Public Relations
  { id: "stc-1", course: "STC 116", title: "Student Acknowledgement Form Due", date: "2026-08-26", type: "assignment" },
  { id: "stc-2", course: "STC 116", title: "Quiz #1 (Ch 1–3)", date: "2026-08-31", type: "quiz" },
  { id: "stc-3", course: "STC 116", title: "Quiz #2 (Ch 5)", date: "2026-09-02", type: "quiz" },
  { id: "stc-4", course: "STC 116", title: "Individual Assignment #1 – PR Leadership", date: "2026-09-09", type: "assignment" },
  { id: "stc-5", course: "STC 116", title: "Quiz #3 (Ch 4)", date: "2026-09-14", type: "quiz" },
  { id: "stc-6", course: "STC 116", title: "Individual Assignment #2 – CEO View", date: "2026-09-21", type: "assignment" },
  { id: "stc-7", course: "STC 116", title: "Quiz #4 (Ch 6)", date: "2026-09-28", type: "quiz" },
  { id: "stc-8", course: "STC 116", title: "Quiz #5 (Ch 7)", date: "2026-10-07", type: "quiz" },
  { id: "stc-9", course: "STC 116", title: "Exam One", date: "2026-10-19", type: "exam" },
  { id: "stc-10", course: "STC 116", title: "Individual Assignment #3 (Ch 16)", date: "2026-10-28", type: "assignment" },
  { id: "stc-11", course: "STC 116", title: "Quiz #6 (Ch 14)", date: "2026-11-04", type: "quiz" },
  { id: "stc-12", course: "STC 116", title: "Individual Assignment #4 (Ch 17)", date: "2026-11-04", type: "assignment" },
  { id: "stc-13", course: "STC 116", title: "Discussion Leader Assignment #1", date: "2026-11-09", type: "assignment" },
  { id: "stc-14", course: "STC 116", title: "Quiz #7 (Ch 15 & 18)", date: "2026-11-11", type: "quiz" },
  { id: "stc-15", course: "STC 116", title: "Discussion Leader Assignment #2", date: "2026-11-18", type: "assignment" },
  { id: "stc-16", course: "STC 116", title: "Exam Two", date: "2026-12-04", note: "2:00–4:30 PM", type: "exam" },

  // ISE 441 — Operations Research and Optimization Methods
  { id: "ise441-1", course: "ISE 441", title: "Test 1", date: "2026-09-29", type: "exam" },
  { id: "ise441-2", course: "ISE 441", title: "Test 2", date: "2026-11-10", type: "exam" },
  { id: "ise441-3", course: "ISE 441", title: "Group Project Presentation", date: "2026-12-01", type: "project" },
  { id: "ise441-4", course: "ISE 441", title: "Project 1 Report Due", date: "2026-12-09", note: "11:00 PM", type: "project" },
  { id: "ise441-5", course: "ISE 441", title: "Final Exam (check CaneLink for exact time)", date: "2026-12-09", note: "Window: Dec 3–9", type: "exam" },

  // ISE 310 — Introduction to Engineering Probability
  { id: "ise310-1", course: "ISE 310", title: "Homework #1 Due", date: "2026-09-07", type: "assignment" },
  { id: "ise310-2", course: "ISE 310", title: "Homework #2 Due", date: "2026-09-18", type: "assignment" },
  { id: "ise310-3", course: "ISE 310", title: "Homework #3 Due", date: "2026-09-25", type: "assignment" },
  { id: "ise310-4", course: "ISE 310", title: "Midterm Exam #1", date: "2026-09-28", note: "10:00–11:00 AM", type: "exam" },
  { id: "ise310-5", course: "ISE 310", title: "Homework #4 Due", date: "2026-10-12", type: "assignment" },
  { id: "ise310-6", course: "ISE 310", title: "Homework #5 Due", date: "2026-10-23", type: "assignment" },
  { id: "ise310-7", course: "ISE 310", title: "Homework #6 Due", date: "2026-10-30", type: "assignment" },
  { id: "ise310-8", course: "ISE 310", title: "Midterm Exam #2", date: "2026-11-02", note: "10:00–11:00 AM", type: "exam" },
  { id: "ise310-9", course: "ISE 310", title: "Homework #7 Due", date: "2026-11-16", type: "assignment" },
  { id: "ise310-10", course: "ISE 310", title: "Homework #8 Due", date: "2026-11-30", type: "assignment" },
  { id: "ise310-11", course: "ISE 310", title: "Homework #9 Due", date: "2026-12-04", type: "assignment" },
  { id: "ise310-12", course: "ISE 310", title: "Final Exam", date: "2026-12-09", note: "11:00 AM–1:30 PM", type: "exam" },

  // INS 102 / GEG 204 — Global Economics
  { id: "ins102-1", course: "GEG 204", title: "Quiz #1", date: "2026-08-27", type: "quiz" },
  { id: "ins102-2", course: "GEG 204", title: "Quiz #2", date: "2026-09-08", type: "quiz" },
  { id: "ins102-3", course: "GEG 204", title: "Quiz #3", date: "2026-09-17", type: "quiz" },
  { id: "ins102-4", course: "GEG 204", title: "Quiz #4", date: "2026-09-29", type: "quiz" },
  { id: "ins102-5", course: "GEG 204", title: "Exam I", date: "2026-10-06", type: "exam" },
  { id: "ins102-6", course: "GEG 204", title: "Quiz #5", date: "2026-10-20", type: "quiz" },
  { id: "ins102-7", course: "GEG 204", title: "Quiz #6", date: "2026-10-29", type: "quiz" },
  { id: "ins102-8", course: "GEG 204", title: "Policy Brief Due", date: "2026-11-10", note: "11:59 PM", type: "assignment" },
  { id: "ins102-9", course: "GEG 204", title: "Group Project Presentations Begin", date: "2026-11-12", type: "project" },
  { id: "ins102-10", course: "GEG 204", title: "Exam II", date: "2026-12-01", type: "exam" },
  { id: "ins102-11", course: "GEG 204", title: "Group Project Report Due", date: "2026-12-09", note: "11:59 PM", type: "project" },

  // ISE 380 — Engineering Economic Analysis
  { id: "ise380-1", course: "ISE 380", title: "Homework Ch. 1 Due", date: "2026-08-26", type: "assignment" },
  { id: "ise380-2", course: "ISE 380", title: "Homework Ch. 2 Due", date: "2026-08-31", type: "assignment" },
  { id: "ise380-3", course: "ISE 380", title: "Homework Ch. 3 Due", date: "2026-09-02", type: "assignment" },
  { id: "ise380-4", course: "ISE 380", title: "Homework Ch. 4 Due", date: "2026-09-09", type: "assignment" },
  { id: "ise380-5", course: "ISE 380", title: "Homework Ch. 5 Due", date: "2026-09-16", type: "assignment" },
  { id: "ise380-6", course: "ISE 380", title: "Homework Ch. 6 Due", date: "2026-09-18", type: "assignment" },
  { id: "ise380-7", course: "ISE 380", title: "Test #1 (Ch 1–6)", date: "2026-09-21", type: "exam" },
  { id: "ise380-8", course: "ISE 380", title: "Homework Ch. 7 Due", date: "2026-10-02", type: "assignment" },
  { id: "ise380-9", course: "ISE 380", title: "Homework Ch. 8 Due", date: "2026-10-05", type: "assignment" },
  { id: "ise380-10", course: "ISE 380", title: "Homework Ch. 9 Due", date: "2026-10-09", type: "assignment" },
  { id: "ise380-11", course: "ISE 380", title: "Homework Ch. 10 Due", date: "2026-10-14", type: "assignment" },
  { id: "ise380-12", course: "ISE 380", title: "Homework Ch. 12 Due", date: "2026-10-16", type: "assignment" },
  { id: "ise380-13", course: "ISE 380", title: "Walmart Case Study Due", date: "2026-10-21", type: "project" },
  { id: "ise380-14", course: "ISE 380", title: "Homework Ch. 11 & 13 Due", date: "2026-10-23", type: "assignment" },
  { id: "ise380-15", course: "ISE 380", title: "Test #2 (Ch 7–13)", date: "2026-10-26", type: "exam" },
  { id: "ise380-16", course: "ISE 380", title: "Homework Ch. 14 Due", date: "2026-11-02", type: "assignment" },
  { id: "ise380-17", course: "ISE 380", title: "Homework Ch. 15 Due", date: "2026-11-09", type: "assignment" },
  { id: "ise380-18", course: "ISE 380", title: "Financial Quiz #2 and #3", date: "2026-11-16", type: "quiz" },
  { id: "ise380-19", course: "ISE 380", title: "Financial Statements Homework Due", date: "2026-11-18", type: "assignment" },
  { id: "ise380-20", course: "ISE 380", title: "Group Case Study – Calabash Hospital Due", date: "2026-11-23", type: "project" },
  { id: "ise380-21", course: "ISE 380", title: "Homework Ch. 16 & 17 Due", date: "2026-11-30", type: "assignment" },
  { id: "ise380-22", course: "ISE 380", title: "Test #3 (Ch 14–17 & Fin. Acct.)", date: "2026-12-07", note: "11:00 AM–1:30 PM", type: "exam" },
];
