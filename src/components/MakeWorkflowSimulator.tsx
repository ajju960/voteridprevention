/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MakeWorkflowRun } from '../types';
import { Play, CheckCircle, AlertTriangle, Cpu, Terminal, ArrowRight, Activity, Code, Settings } from 'lucide-react';

interface MakeWorkflowSimulatorProps {
  workflowRuns: MakeWorkflowRun[];
  activeWorkflow: string | null;
}

export default function MakeWorkflowSimulator({ workflowRuns, activeWorkflow }: MakeWorkflowSimulatorProps) {
  const [selectedRun, setSelectedRun] = useState<MakeWorkflowRun | null>(null);

  useEffect(() => {
    if (workflowRuns.length > 0) {
      setSelectedRun(workflowRuns[0]); // Default to latest run
    }
  }, [workflowRuns]);

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-800 shadow-2xl h-full flex flex-col font-sans">
      {/* Make.com Header */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-1.5 rounded text-white animate-pulse">
            <Cpu size={16} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-sm tracking-wide text-slate-200">Make.com Automation Pipeline</h3>
            <p className="text-[11px] text-slate-400">Serverless Middleware & Integrations</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/60 border border-purple-900 text-purple-400">
          <Activity size={10} className="animate-pulse" />
          <span>Listening</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left Side: Workflows Flowcharts & Active Run Indicator */}
        <div className="p-4 border-r border-slate-800 overflow-y-auto flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Settings size={12} className="text-purple-400" />
            <span>Active Integration Flowcharts</span>
          </h4>

          {/* Workflow 1: Registration */}
          <div className={`p-3 rounded-lg border transition ${
            activeWorkflow === 'Registration'
              ? 'bg-purple-950/20 border-purple-500 ring-1 ring-purple-500'
              : 'bg-slate-950 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-300">Scenario 1: Voter Registration</span>
              {activeWorkflow === 'Registration' && (
                <span className="px-1.5 py-0.2 text-[9px] bg-purple-600 text-white rounded font-mono animate-pulse">RUNNING</span>
              )}
            </div>
            {/* Horizontal Nodes Map */}
            <div className="flex items-center gap-1 overflow-x-auto py-1 text-[9px] font-mono">
              <span className="px-1.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded">Webflow Webhook</span>
              <ArrowRight size={10} className="text-slate-600 flex-shrink-0" />
              <span className="px-1.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded">Airtable Lookup</span>
              <ArrowRight size={10} className="text-slate-600 flex-shrink-0" />
              <div className="flex flex-col gap-1 border-l-2 border-dashed border-slate-700 pl-1">
                <span className="px-1 bg-emerald-950 text-emerald-400 rounded">Create DB</span>
                <span className="px-1 bg-blue-950 text-blue-400 rounded">Memstack</span>
                <span className="px-1 bg-cyan-950 text-cyan-400 rounded">Send Grid</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">
              Triggered upon Webflow registration form submit. Validates duplicates, generates unique Voter IDs, and sets up Memberstack authentication credentials.
            </p>
          </div>

          {/* Workflow 2: Anonymous Voting */}
          <div className={`p-3 rounded-lg border transition ${
            activeWorkflow === 'Voting'
              ? 'bg-purple-950/20 border-purple-500 ring-1 ring-purple-500'
              : 'bg-slate-950 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-300">Scenario 2: Anonymous Ballot Submission</span>
              {activeWorkflow === 'Voting' && (
                <span className="px-1.5 py-0.2 text-[9px] bg-purple-600 text-white rounded font-mono animate-pulse">RUNNING</span>
              )}
            </div>
            <div className="flex items-center gap-1 overflow-x-auto py-1 text-[9px] font-mono">
              <span className="px-1.5 py-1 bg-indigo-950 text-indigo-400 rounded">Client Submit</span>
              <ArrowRight size={10} className="text-slate-600" />
              <span className="px-1.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded">Verify Session</span>
              <ArrowRight size={10} className="text-slate-600" />
              <span className="px-1.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded">Write Anon Vote</span>
              <ArrowRight size={10} className="text-slate-600" />
              <span className="px-1.5 py-1 bg-emerald-950 text-emerald-400 rounded">Set 'Voted'</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">
              Runs anonymously using isolated transaction tunnels. Appends a hashed vote entry, updates Voter's eligibility status, and appends a general Audit Log entry.
            </p>
          </div>

          {/* Workflow 4: Duplicate Detection */}
          <div className={`p-3 rounded-lg border transition ${
            activeWorkflow === 'Duplicate Detection'
              ? 'bg-purple-950/20 border-purple-500 ring-1 ring-purple-500'
              : 'bg-slate-950 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-300">Scenario 4: Duplicate Similarity Analyzer</span>
              {activeWorkflow === 'Duplicate Detection' && (
                <span className="px-1.5 py-0.2 text-[9px] bg-purple-600 text-white rounded font-mono animate-pulse">RUNNING</span>
              )}
            </div>
            <div className="flex items-center gap-1 overflow-x-auto py-1 text-[9px] font-mono">
              <span className="px-1.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded">DB Listen</span>
              <ArrowRight size={10} className="text-slate-600" />
              <span className="px-1.5 py-1 bg-amber-950 text-amber-400 rounded">Fuzzy Scan</span>
              <ArrowRight size={10} className="text-slate-600" />
              <span className="px-1.5 py-1 bg-red-950 text-red-400 rounded">Flag Record</span>
              <ArrowRight size={10} className="text-slate-600" />
              <span className="px-1.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded">Slack Alert</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">
              Automated scheduler matching Aadhaar IDs, emails, and phone records. Suspends suspect registers and flags them for immediate manual election officer auditing.
            </p>
          </div>
        </div>

        {/* Right Side: Log Console & Payload Inspector */}
        <div className="flex flex-col overflow-hidden h-full">
          {/* History list */}
          <div className="p-3 bg-slate-950 border-b border-slate-800 flex flex-col overflow-hidden h-[180px]">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
              <Terminal size={12} className="text-emerald-400" />
              <span>Make execution logs (Latest first)</span>
            </h4>
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
              {workflowRuns.length === 0 ? (
                <div className="text-center py-6 text-slate-500 font-mono text-[11px]">No workflow executions recorded yet.</div>
              ) : (
                workflowRuns.map(run => (
                  <button
                    key={run.runId}
                    onClick={() => setSelectedRun(run)}
                    className={`w-full text-left p-2 rounded transition flex items-center justify-between text-[11px] ${
                      selectedRun?.runId === run.runId ? 'bg-slate-850 border border-slate-700' : 'bg-slate-900 border border-transparent hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {run.status === 'Success' ? (
                        <CheckCircle size={12} className="text-emerald-400" />
                      ) : (
                        <AlertTriangle size={12} className="text-amber-400" />
                      )}
                      <div>
                        <span className="font-semibold text-slate-200">{run.workflowName}</span>
                        <span className="text-[9px] text-slate-400 block">{new Date(run.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                    <span className="font-mono text-[9px] text-slate-500">{run.runId}</span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Code Inspector */}
          <div className="flex-1 p-3 bg-slate-950 flex flex-col overflow-hidden font-mono text-[11px]">
            <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-slate-800">
              <span className="flex items-center gap-1">
                <Code size={12} className="text-cyan-400" />
                <span>JSON Payload Inspector</span>
              </span>
              {selectedRun && <span className="bg-slate-800 px-1 rounded text-cyan-400">{selectedRun.runId}</span>}
            </div>

            <div className="flex-1 overflow-auto bg-slate-900/50 p-2.5 rounded-md text-emerald-400 mt-2 text-[10px] leading-relaxed select-all">
              {selectedRun ? (
                <pre>{JSON.stringify(selectedRun.payload, null, 2)}</pre>
              ) : (
                <p className="text-slate-500 italic">Select an execution log above to inspect its active JSON webhook payload parameters.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
