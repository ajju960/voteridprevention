/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type VerificationStatus = 'Pending' | 'Approved' | 'Rejected' | 'Suspended';
export type VoteStatus = 'Not Voted' | 'Voted';
export type ElectionStatus = 'Active' | 'Completed' | 'Scheduled';

export interface Voter {
  voterId: string; // Unique UVIAS ID (e.g., UV-XXXXXX)
  name: string;
  dob: string;
  email: string;
  mobile: string;
  gender: string;
  address: string;
  constituency: string;
  nationalId: string; // National Identity Number
  idProofUrl: string; // Base64 or placeholder URL
  profilePhotoUrl: string; // Base64 or placeholder URL
  verificationStatus: VerificationStatus;
  voteStatus: VoteStatus;
  memberstackId: string;
  registeredAt: string;
  flaggedDuplicate: boolean;
  duplicateReason?: string;
}

export interface Candidate {
  candidateId: string;
  name: string;
  party: string;
  symbol: string; // Symbol description or emoji/icon
  manifesto: string;
  experience: string;
  photoUrl: string;
}

export interface Vote {
  voteId: string;
  electionId: string;
  candidateId: string;
  timestamp: string;
}

export interface AuditLog {
  logId: string;
  user: string; // Email or Voter ID or "SYSTEM" or "ADMIN"
  action: 'Registration' | 'Login' | 'Logout' | 'Vote Submitted' | 'Verification' | 'Approval' | 'Rejection' | 'Duplicate Detection' | 'Admin Changes';
  timestamp: string;
  details: string;
  ipAddress: string;
  electionId?: string;
}

export interface Election {
  electionId: string;
  electionName: string;
  startDate: string;
  endDate: string;
  status: ElectionStatus;
}

export interface MakeWorkflowRun {
  runId: string;
  workflowName: 'Registration' | 'Voting' | 'Admin Approval' | 'Duplicate Detection';
  timestamp: string;
  status: 'Success' | 'Warning' | 'Error' | 'Running';
  payload: any;
  steps: string[];
}
