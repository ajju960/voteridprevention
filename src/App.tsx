/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Voter, Candidate, Vote, AuditLog, Election, MakeWorkflowRun } from './types';
import {
  INITIAL_CANDIDATES,
  INITIAL_VOTERS,
  INITIAL_VOTES,
  INITIAL_AUDIT_LOGS,
  INITIAL_ELECTIONS,
  INITIAL_WORKFLOWS
} from './mockData';
import AirtableInspector from './components/AirtableInspector';
import MakeWorkflowSimulator from './components/MakeWorkflowSimulator';
import WebflowPortal from './components/WebflowPortal';
import { Monitor, Database, Cpu, ShieldCheck, Layers, RotateCcw } from 'lucide-react';

export default function App() {
  // Database States
  const [voters, setVoters] = useState<Voter[]>(INITIAL_VOTERS);
  const [candidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [votes, setVotes] = useState<Vote[]>(INITIAL_VOTES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [elections, setElections] = useState<Election[]>(INITIAL_ELECTIONS);

  // Automation / Integration States
  const [workflowRuns, setWorkflowRuns] = useState<MakeWorkflowRun[]>(INITIAL_WORKFLOWS);
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);

  // Authentication State (simulated Memberstack cookies)
  const [currentUser, setCurrentUser] = useState<Voter | null>(null);
  const [userRole, setUserRole] = useState<'Voter' | 'Election Official' | 'Administrator' | null>(null);

  // Layout View State for mobile/tablet screens (toggles between client portal and backend inspector)
  const [mobileActiveView, setMobileActiveView] = useState<'portal' | 'airtable' | 'make'>('portal');

  // Trigger: Simulate a Make.com scenario running
  const triggerWorkflow = (
    name: 'Registration' | 'Voting' | 'Admin Approval' | 'Duplicate Detection',
    payload: any,
    steps: string[]
  ) => {
    setActiveWorkflow(name);
    
    // Create new workflow execution record
    const newRun: MakeWorkflowRun = {
      runId: `MAKE-RUN-${Math.floor(100 + Math.random() * 899)}`,
      workflowName: name,
      timestamp: new Date().toISOString(),
      status: name === 'Duplicate Detection' ? 'Warning' : 'Success',
      payload,
      steps
    };

    setWorkflowRuns(prev => [newRun, ...prev]);

    // Turn off pulsing after 3 seconds
    setTimeout(() => {
      setActiveWorkflow(null);
    }, 2800);
  };

  // Handler: Reset sandbox database back to pristine initial state
  const handleResetDatabase = () => {
    if (window.confirm("Are you sure you want to restore the Airtable and Memberstack registries to their initial demo states? All newly created votes and registrants will be cleared.")) {
      setVoters(INITIAL_VOTERS);
      setVotes(INITIAL_VOTES);
      setAuditLogs(INITIAL_AUDIT_LOGS);
      setElections(INITIAL_ELECTIONS);
      setWorkflowRuns(INITIAL_WORKFLOWS);
      setCurrentUser(null);
      setUserRole(null);
      setActiveWorkflow(null);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-900 font-sans">
      
      {/* GLOBAL SANDBOX EXECUTIVE BAR */}
      <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-white z-20 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="bg-[#05BFDB] p-1 rounded-lg text-slate-950 animate-pulse">
            <ShieldCheck size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-slate-200">UVIAS Prototype Sandbox</span>
              <span className="px-1.5 py-0.2 bg-[#0A4D68] text-[9px] font-bold rounded text-[#05BFDB]">SYSTEM ACTIVE</span>
            </div>
            <span className="text-[10px] text-slate-400 block -mt-0.5">Educational Mockup Environment • Webflow + Airtable + Memberstack + Make</span>
          </div>
        </div>

        {/* Desktop Controls / Responsive view Switcher */}
        <div className="flex items-center gap-3">
          
          {/* Quick Info text on desktop */}
          <span className="hidden xl:inline text-[10px] text-slate-500 font-mono">
            Sandbox ID: b371a043 • SSL Active • React 19 Engine
          </span>

          {/* Reset database */}
          <button
            onClick={handleResetDatabase}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700 rounded text-slate-300 transition"
            title="Clear all live sessions and reset database"
          >
            <RotateCcw size={11} />
            <span className="hidden sm:inline">Reset Sandbox</span>
          </button>
        </div>
      </div>

      {/* MOBILE / TABLET VIEW TOGGLE PANEL BAR */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-2.5 py-1.5 flex items-center gap-2 text-white z-10 flex-shrink-0">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-2">Inspector:</span>
        <button
          onClick={() => setMobileActiveView('portal')}
          className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
            mobileActiveView === 'portal' ? 'bg-[#0A4D68] text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🌐 Live Site
        </button>
        <button
          onClick={() => setMobileActiveView('airtable')}
          className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
            mobileActiveView === 'airtable' ? 'bg-[#0A4D68] text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🗄️ Airtable
        </button>
        <button
          onClick={() => setMobileActiveView('make')}
          className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
            mobileActiveView === 'make' ? 'bg-[#0A4D68] text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          ⚡ Make Flows
        </button>
      </div>

      {/* MAIN APPLICATION CONTAINER SPLIT PANEL */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT COLUMN PANEL: THE LIVE WEBFLOW PORTAL */}
        <div className={`flex-1 flex flex-col h-full bg-slate-50 overflow-y-auto z-10 border-r border-slate-800 ${
          mobileActiveView === 'portal' ? 'block' : 'hidden lg:block'
        } lg:w-7/12 xl:w-8/12`}>
          <WebflowPortal
            voters={voters}
            setVoters={setVoters}
            candidates={candidates}
            votes={votes}
            setVotes={setVotes}
            auditLogs={auditLogs}
            setAuditLogs={setAuditLogs}
            elections={elections}
            setElections={setElections}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            userRole={userRole}
            setUserRole={setUserRole}
            triggerWorkflow={triggerWorkflow}
          />
        </div>

        {/* RIGHT COLUMN PANEL: LIVE BACKEND INSPECTOR (AIRTABLE & MAKE.COM PIPELINES) */}
        <div className={`flex flex-col h-full bg-slate-950 p-3 gap-3 overflow-hidden ${
          mobileActiveView === 'portal' ? 'hidden lg:flex' : 'flex'
        } lg:w-5/12 xl:w-4/12 flex-shrink-0 w-full`}>
          
          {/* Top Half of Right Pane: Airtable Live spreadsheet view */}
          <div className={`flex-1 overflow-hidden min-h-[300px] ${
            mobileActiveView === 'make' ? 'hidden lg:block' : 'block'
          }`}>
            <AirtableInspector
              voters={voters}
              setVoters={setVoters}
              candidates={candidates}
              votes={votes}
              auditLogs={auditLogs}
              elections={elections}
              setElections={setElections}
              onReset={handleResetDatabase}
            />
          </div>

          {/* Bottom Half of Right Pane: Make.com Pipeline flow charts */}
          <div className={`flex-1 overflow-hidden min-h-[300px] ${
            mobileActiveView === 'airtable' ? 'hidden lg:block' : 'block'
          }`}>
            <MakeWorkflowSimulator
              workflowRuns={workflowRuns}
              activeWorkflow={activeWorkflow}
            />
          </div>

        </div>

      </div>

    </div>
  );
}
