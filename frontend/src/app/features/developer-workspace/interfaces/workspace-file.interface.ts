export interface WorkspaceFile {

  // -----------------------------
  // Identity
  // -----------------------------

  id: string;

  name: string;

  extension: string;

  type: string;

  language: string;

  size: number;

  uploadedAt: string;

  // -----------------------------
  // Content
  // -----------------------------

  content: string;

  lastSavedContent: string;

  // -----------------------------
  // Editor State
  // -----------------------------

  isDirty: boolean;

  isActive?: boolean;

  isSelected?: boolean;

  // -----------------------------
  // AI State
  // -----------------------------

  aiModified?: boolean;

}