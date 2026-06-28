/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Voter, Candidate, Vote, AuditLog, Election, MakeWorkflowRun } from './types';

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    candidateId: "CAND-001",
    name: "Dr. Aarav Sharma",
    party: "Bharat Pragati Front (BPF)",
    symbol: "⚡ Solar Panel (Saur Urja)",
    manifesto: "Accelerating municipal digital transition, implementing secure open-source smart grids, and funding youth coding bootcamps. Our focus is ensuring public infrastructure is resilient against 21st-century cyber and economic threats.",
    experience: "15 Years in Public Policy & Technology Infrastructure Design",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
  },
  {
    candidateId: "CAND-002",
    name: "Smt. Meena Nair",
    party: "Rashtriya Harit Dal (RHD)",
    symbol: "🍃 Peepal Leaf (Peepal Patta)",
    manifesto: "Transforming the constituency into a zero-carbon micro-grid pioneer, expanding urban parks, and creating green-energy manufacturing jobs. We aim to secure local agriculture through climate-adaptive grants.",
    experience: "12 Years in Sustainable Civil Engineering & Former Municipal Commissioner",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
  },
  {
    candidateId: "CAND-003",
    name: "Shri Rajesh Patel",
    party: "Lok Kalyan Alliance (LKA)",
    symbol: "🤝 Shaking Hands (Maitri)",
    manifesto: "Enhancing state healthcare subsidy models (Mohalla Clinics), supporting fair labor unions, and investing in tuition-free vocational colleges. We believe the economy should serve families and blue-collar workers first.",
    experience: "20 Years in Cooperative Labor Management & Legal Advocacy",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
  },
  {
    candidateId: "CAND-004",
    name: "Ms. Ananya Reddy",
    party: "Swarajya Adhikar Party (SAP)",
    symbol: "⚖️ Scale of Justice (Dharma)",
    manifesto: "Ensuring 100% transparent administrative auditing, establishing municipal corruption watchdogs, and reforming campaign contributions. Decisions should be public, accountable, and citizen-led.",
    experience: "8 Years as Lokayukta Prosecutor & Constitutional Rights Activist",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_ELECTIONS: Election[] = [
  {
    electionId: "ELEC-2026-A",
    electionName: "2026 Lok Sabha General Election",
    startDate: "2026-06-25",
    endDate: "2026-06-30",
    status: "Active"
  },
  {
    electionId: "ELEC-2025-B",
    electionName: "2025 Delhi Legislative Assembly Election",
    startDate: "2025-11-10",
    endDate: "2025-11-12",
    status: "Completed"
  }
];

export const INITIAL_VOTERS: Voter[] = [
  {
    voterId: "UV-482103",
    name: "Amit Kumar Sharma",
    dob: "1988-04-12",
    email: "amit.sharma@gmail.com",
    mobile: "+91 98765 43210",
    gender: "Male",
    address: "A-412, HSR Sector 4, Bengaluru, Karnataka - 560102",
    constituency: "Bengaluru South Constituency",
    nationalId: "AADHAAR-9482-7103-5521",
    idProofUrl: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=400&auto=format&fit=crop&q=80",
    profilePhotoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    verificationStatus: "Approved",
    voteStatus: "Not Voted",
    memberstackId: "usr_mem_001",
    registeredAt: "2026-06-25T10:30:00+05:30",
    flaggedDuplicate: false
  },
  {
    voterId: "UV-193482",
    name: "Priya Nair",
    dob: "1994-11-03",
    email: "priya.nair@outlook.com",
    mobile: "+91 94470 12345",
    gender: "Female",
    address: "789, Marine Drive, Mumbai, Maharashtra - 400002",
    constituency: "Mumbai South Constituency",
    nationalId: "AADHAAR-1928-4738-9904",
    idProofUrl: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=400&auto=format&fit=crop&q=80",
    profilePhotoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    verificationStatus: "Approved",
    voteStatus: "Voted",
    memberstackId: "usr_mem_002",
    registeredAt: "2026-06-25T11:15:00+05:30",
    flaggedDuplicate: false
  },
  {
    voterId: "UV-384910",
    name: "Amrita Sengupta",
    dob: "2001-08-22",
    email: "amrita.sengupta@edu.in",
    mobile: "+91 81234 56789",
    gender: "Female",
    address: "Hostel 12, IIT Bombay Campus, Powai, Mumbai - 400076",
    constituency: "Mumbai North East Constituency",
    nationalId: "AADHAAR-8472-9104-1188",
    idProofUrl: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=400&auto=format&fit=crop&q=80",
    profilePhotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    verificationStatus: "Pending",
    voteStatus: "Not Voted",
    memberstackId: "usr_mem_003",
    registeredAt: "2026-06-26T14:40:00+05:30",
    flaggedDuplicate: false
  },
  {
    voterId: "UV-572190",
    name: "Karthik Raja",
    dob: "1975-03-30",
    email: "karthik.raja@tcs.com",
    mobile: "+91 73580 98765",
    gender: "Male",
    address: "55, Gandhi Road, Adyar, Chennai, Tamil Nadu - 600020",
    constituency: "Chennai South Constituency",
    nationalId: "AADHAAR-1039-4827-0249",
    idProofUrl: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=400&auto=format&fit=crop&q=80",
    profilePhotoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    verificationStatus: "Suspended",
    voteStatus: "Not Voted",
    memberstackId: "usr_mem_004",
    registeredAt: "2026-06-26T16:05:00+05:30",
    flaggedDuplicate: false
  },
  {
    voterId: "UV-DUPE-99",
    name: "Amit Sharma",
    dob: "1988-04-12",
    email: "amit.sharma.alternate@gmail.com",
    mobile: "+91 98765 43210",
    gender: "Male",
    address: "A-412, HSR Sector 4, Bengaluru, Karnataka - 560102",
    constituency: "Bengaluru South Constituency",
    nationalId: "AADHAAR-9482-7103-5521",
    idProofUrl: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=400&auto=format&fit=crop&q=80",
    profilePhotoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    verificationStatus: "Pending",
    voteStatus: "Not Voted",
    memberstackId: "usr_mem_dupe",
    registeredAt: "2026-06-27T09:12:00+05:30",
    flaggedDuplicate: true,
    duplicateReason: "CRITICAL MATCH: Shared Aadhaar ID (AADHAAR-9482-7103-5521) and Mobile Phone with UV-482103 (Amit Kumar Sharma)."
  }
];

export const INITIAL_VOTES: Vote[] = [
  {
    voteId: "VOTE-938210-94",
    electionId: "ELEC-2026-A",
    candidateId: "CAND-002",
    timestamp: "2026-06-25T11:18:22+05:30"
  },
  {
    voteId: "VOTE-104928-85",
    electionId: "ELEC-2025-B",
    candidateId: "CAND-001",
    timestamp: "2025-11-10T14:30:11+05:30"
  },
  {
    voteId: "VOTE-293810-12",
    electionId: "ELEC-2025-B",
    candidateId: "CAND-003",
    timestamp: "2025-11-11T09:15:00+05:30"
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    logId: "LOG-001",
    user: "SYSTEM",
    action: "Registration",
    timestamp: "2026-06-25T10:30:00+05:30",
    details: "New Voter Registration request received for Amit Kumar Sharma (Aadhaar ID: AADHAAR-9482-7103-5521). Unique Voter ID UV-482103 generated.",
    ipAddress: "192.168.1.102"
  },
  {
    logId: "LOG-002",
    user: "ADMIN",
    action: "Approval",
    timestamp: "2026-06-25T10:35:00+05:30",
    details: "Administrator approved registration for Amit Kumar Sharma (UV-482103) after validation of Aadhaar proof. Email notification sent.",
    ipAddress: "10.0.0.4"
  },
  {
    logId: "LOG-003",
    user: "usr_mem_002",
    action: "Login",
    timestamp: "2026-06-25T11:10:00+05:30",
    details: "Voter Priya Nair (UV-193482) successfully authenticated via Memberstack session token.",
    ipAddress: "172.56.21.90"
  },
  {
    logId: "LOG-004",
    user: "ANONYMOUS-SESSION-938",
    action: "Vote Submitted",
    timestamp: "2026-06-25T11:18:22+05:30",
    details: "Anonymous cryptographic vote saved for Election ELEC-2026-A. Candidate pointer established. Voter status updated to 'Voted'.",
    ipAddress: "172.56.21.90",
    electionId: "ELEC-2026-A"
  },
  {
    logId: "LOG-005",
    user: "usr_mem_002",
    action: "Logout",
    timestamp: "2026-06-25T11:20:00+05:30",
    details: "Voter Priya Nair logged out safely. Memberstack session invalidated.",
    ipAddress: "172.56.21.90"
  },
  {
    logId: "LOG-006",
    user: "SYSTEM",
    action: "Duplicate Detection",
    timestamp: "2026-06-27T09:12:00+05:30",
    details: "ALARM: Make Workflow 4 flagged potential duplicate registration for 'Amit Sharma' (AADHAAR-9482-7103-5521) matching existing approved record UV-482103. Administrator alerted.",
    ipAddress: "185.22.45.10"
  }
];

export const INITIAL_WORKFLOWS: MakeWorkflowRun[] = [
  {
    runId: "MAKE-RUN-884",
    workflowName: "Registration",
    timestamp: "2026-06-26T14:40:02+05:30",
    status: "Success",
    payload: {
      input: {
        formName: "Voter Registration",
        fields: { email: "amrita.sengupta@edu.in", name: "Amrita Sengupta", nid: "AADHAAR-8472-9104-1188" }
      },
      airtableStatus: "Record Created in Voters Table",
      memberstackStatus: "Created user usr_mem_003"
    },
    steps: ["Webflow Form Trigger", "Airtable Search Duplicate", "Generate Voter ID", "Airtable Create Record", "Memberstack Create User", "Sendgrid Email Notification"]
  },
  {
    runId: "MAKE-RUN-885",
    workflowName: "Duplicate Detection",
    timestamp: "2026-06-27T09:12:05+05:30",
    status: "Warning",
    payload: {
      scannedField: "AADHAAR-9482-7103-5521",
      matchedWith: "UV-482103",
      outcome: "Flagged duplicate, set status to Pending, Sent alert Slack to admin"
    },
    steps: ["Voter Table Watcher", "Validate Core Uniqueness", "Identify NID Match", "Update Duplicate Flag in Airtable", "Trigger Admin Webhook Alert"]
  }
];
