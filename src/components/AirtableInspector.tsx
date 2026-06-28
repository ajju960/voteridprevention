/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Voter, Candidate, Vote, AuditLog, Election } from '../types';
import { Database, Search, Edit2, RotateCcw, ShieldCheck, AlertTriangle, Plus, Check, X } from 'lucide-react';

interface AirtableInspectorProps {
  voters: Voter[];
  setVoters: React.Dispatch<React.SetStateAction<Voter[]>>;
  candidates: Candidate[];
  votes: Vote[];
  auditLogs: AuditLog[];
  elections: Election[];
  setElections: React.Dispatch<React.SetStateAction<Election[]>>;
  onReset: () => void;
}

type TableTab = 'voters' | 'candidates' | 'votes' | 'audit' | 'elections';

export default function AirtableInspector({
  voters,
  setVoters,
  candidates,
  votes,
  auditLogs,
  elections,
  setElections,
  onReset
}: AirtableInspectorProps) {
  const [activeTab, setActiveTab] = useState<TableTab>('voters');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingVoterId, setEditingVoterId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<'Pending' | 'Approved' | 'Rejected' | 'Suspended'>('Pending');

  // Filter based on search query
  const handleVoterStatusChange = (voterId: string, status: 'Pending' | 'Approved' | 'Rejected' | 'Suspended') => {
    setVoters(prev => prev.map(v => v.voterId === voterId ? { ...v, verificationStatus: status } : v));
    setEditingVoterId(null);
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-800 shadow-2xl h-full flex flex-col font-sans">
      {/* Airtable Header */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#E95B35] p-1.5 rounded text-white">
            <Database size={16} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-sm tracking-wide text-slate-200">Airtable Cloud Database</h3>
            <p className="text-[11px] text-slate-400">Live Backend Database Synchronization</p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 rounded transition"
          title="Reset Database to Initial State"
        >
          <RotateCcw size={12} />
          <span>Reset Db</span>
        </button>
      </div>

      {/* Tables Navigation Tabs */}
      <div className="bg-slate-900 border-b border-slate-800 px-2 flex items-center overflow-x-auto whitespace-nowrap">
        {(['voters', 'candidates', 'votes', 'elections', 'audit'] as const).map(tab => {
          const count = tab === 'voters' ? voters.length 
                      : tab === 'candidates' ? candidates.length 
                      : tab === 'votes' ? votes.length 
                      : tab === 'elections' ? elections.length 
                      : auditLogs.length;
          return (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSearchQuery(''); }}
              className={`px-3 py-2 text-xs font-semibold border-b-2 flex items-center gap-1.5 capitalize transition ${
                activeTab === tab 
                  ? 'border-accent text-accent bg-slate-850' 
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <span>{tab === 'audit' ? 'Audit Logs' : tab}</span>
              <span className="px-1.5 py-0.2 bg-slate-800 text-[10px] text-slate-400 rounded-full">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Table Search */}
      <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center gap-2">
        <Search size={14} className="text-slate-500" />
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs w-full text-slate-200 placeholder-slate-500 focus:outline-none focus:border-accent"
        />
      </div>

      {/* Live Spreadsheet View */}
      <div className="flex-1 overflow-auto text-xs">
        {activeTab === 'voters' && (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                <th className="p-2 border-r border-slate-800 w-10 text-center">#</th>
                <th className="p-2 border-r border-slate-800">Voter ID</th>
                <th className="p-2 border-r border-slate-800">Name</th>
                <th className="p-2 border-r border-slate-800">Aadhaar ID</th>
                <th className="p-2 border-r border-slate-800">Verification</th>
                <th className="p-2 border-r border-slate-800">Vote Status</th>
                <th className="p-2">Contact Details</th>
              </tr>
            </thead>
            <tbody>
              {voters
                .filter(v => v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.voterId.toLowerCase().includes(searchQuery.toLowerCase()) || v.nationalId.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((v, i) => (
                  <tr key={v.voterId} className={`border-b border-slate-800 hover:bg-slate-850 transition ${v.flaggedDuplicate ? 'bg-red-950/20 hover:bg-red-950/30' : ''}`}>
                    <td className="p-2 border-r border-slate-800 text-slate-500 text-center font-mono">{i + 1}</td>
                    <td className="p-2 border-r border-slate-800 font-mono text-cyan-400 font-semibold">{v.voterId}</td>
                    <td className="p-2 border-r border-slate-800 font-medium">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate">{v.name}</span>
                        {v.flaggedDuplicate && (
                          <span className="bg-red-900/60 text-red-200 text-[9px] px-1 rounded animate-pulse" title={v.duplicateReason}>DUPE</span>
                        )}
                      </div>
                    </td>
                    <td className="p-2 border-r border-slate-800 font-mono text-slate-300">{v.nationalId}</td>
                    <td className="p-2 border-r border-slate-800">
                      {editingVoterId === v.voterId ? (
                        <div className="flex items-center gap-1">
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value as any)}
                            className="bg-slate-800 border border-slate-700 text-[11px] rounded p-0.5 text-slate-200 focus:outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Suspended">Suspended</option>
                          </select>
                          <button
                            onClick={() => handleVoterStatusChange(v.voterId, editStatus)}
                            className="p-1 bg-emerald-600 hover:bg-emerald-500 rounded text-white"
                          >
                            <Check size={10} />
                          </button>
                          <button
                            onClick={() => setEditingVoterId(null)}
                            className="p-1 bg-slate-700 hover:bg-slate-600 rounded text-white"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-1 group">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                            v.verificationStatus === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' :
                            v.verificationStatus === 'Pending' ? 'bg-amber-950 text-amber-400 border border-amber-900' :
                            v.verificationStatus === 'Suspended' ? 'bg-slate-800 text-slate-400 border border-slate-700' :
                            'bg-red-950 text-red-400 border border-red-900'
                          }`}>
                            {v.verificationStatus}
                          </span>
                          <button
                            onClick={() => { setEditingVoterId(v.voterId); setEditStatus(v.verificationStatus); }}
                            className="text-slate-500 hover:text-slate-300 transition opacity-0 group-hover:opacity-100 p-0.5"
                            title="Quick Edit Status"
                          >
                            <Edit2 size={10} />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="p-2 border-r border-slate-800">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                        v.voteStatus === 'Voted' ? 'bg-indigo-950 text-indigo-300 border border-indigo-900' : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {v.voteStatus}
                      </span>
                    </td>
                    <td className="p-2 text-slate-400 truncate max-w-[140px]" title={`${v.email} | ${v.mobile}`}>
                      {v.email}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {activeTab === 'candidates' && (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                <th className="p-2 border-r border-slate-800 w-10 text-center">#</th>
                <th className="p-2 border-r border-slate-800">Candidate ID</th>
                <th className="p-2 border-r border-slate-800">Name</th>
                <th className="p-2 border-r border-slate-800">Party</th>
                <th className="p-2">Symbol</th>
              </tr>
            </thead>
            <tbody>
              {candidates
                .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.party.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((c, i) => (
                  <tr key={c.candidateId} className="border-b border-slate-800 hover:bg-slate-850 transition">
                    <td className="p-2 border-r border-slate-800 text-slate-500 text-center font-mono">{i + 1}</td>
                    <td className="p-2 border-r border-slate-800 font-mono text-cyan-400 font-semibold">{c.candidateId}</td>
                    <td className="p-2 border-r border-slate-800 font-medium text-slate-200">{c.name}</td>
                    <td className="p-2 border-r border-slate-800 text-slate-300">{c.party}</td>
                    <td className="p-2 font-mono text-amber-400">{c.symbol}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {activeTab === 'votes' && (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                <th className="p-2 border-r border-slate-800 w-10 text-center">#</th>
                <th className="p-2 border-r border-slate-800">Vote GUID (Hash)</th>
                <th className="p-2 border-r border-slate-800">Election Name</th>
                <th className="p-2 border-r border-slate-800">Candidate Target</th>
                <th className="p-2">Timestamp (UTC)</th>
              </tr>
            </thead>
            <tbody>
              {votes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-mono italic">
                    No anonymous votes stored in Airtable yet. Use the Voting page to submit a ballot.
                  </td>
                </tr>
              ) : (
                votes
                  .filter(v => v.voteId.includes(searchQuery) || v.candidateId.includes(searchQuery))
                  .map((v, i) => {
                    const candidate = candidates.find(c => c.candidateId === v.candidateId);
                    const electionName = v.electionId === "ELEC-2026-A" ? "2026 Congressional" : "2025 Municipal";
                    return (
                      <tr key={v.voteId} className="border-b border-slate-800 hover:bg-slate-850 transition">
                        <td className="p-2 border-r border-slate-800 text-slate-500 text-center font-mono">{i + 1}</td>
                        <td className="p-2 border-r border-slate-800 font-mono text-indigo-400 select-all" title="Hashed ID - Zero voter connection">{v.voteId}</td>
                        <td className="p-2 border-r border-slate-800 text-slate-300">{electionName}</td>
                        <td className="p-2 border-r border-slate-800 text-slate-200 font-medium">
                          {candidate ? `${candidate.name} (${candidate.party})` : v.candidateId}
                        </td>
                        <td className="p-2 font-mono text-slate-400">{new Date(v.timestamp).toLocaleString()}</td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'elections' && (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                <th className="p-2 border-r border-slate-800 w-10 text-center">#</th>
                <th className="p-2 border-r border-slate-800">Election Name</th>
                <th className="p-2 border-r border-slate-800">Start Date</th>
                <th className="p-2 border-r border-slate-800">End Date</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {elections
                .filter(e => e.electionName.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((e, i) => (
                  <tr key={e.electionId} className="border-b border-slate-800 hover:bg-slate-850 transition">
                    <td className="p-2 border-r border-slate-800 text-slate-500 text-center font-mono">{i + 1}</td>
                    <td className="p-2 border-r border-slate-800 font-medium text-slate-200">{e.electionName}</td>
                    <td className="p-2 border-r border-slate-800 font-mono text-slate-400">{e.startDate}</td>
                    <td className="p-2 border-r border-slate-800 font-mono text-slate-400">{e.endDate}</td>
                    <td className="p-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        e.status === 'Active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' :
                        e.status === 'Completed' ? 'bg-slate-800 text-slate-400 border border-slate-700' :
                        'bg-amber-950 text-amber-400 border border-amber-900'
                      }`}>
                        {e.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {activeTab === 'audit' && (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                <th className="p-2 border-r border-slate-800 w-10 text-center">#</th>
                <th className="p-2 border-r border-slate-800">Timestamp</th>
                <th className="p-2 border-r border-slate-800">Actor</th>
                <th className="p-2 border-r border-slate-800">Action Type</th>
                <th className="p-2">Log Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs
                .filter(l => l.user.toLowerCase().includes(searchQuery.toLowerCase()) || l.action.toLowerCase().includes(searchQuery.toLowerCase()) || l.details.toLowerCase().includes(searchQuery.toLowerCase()))
                .slice().reverse() // Show latest first in this spreadsheet
                .map((l, i) => (
                  <tr key={l.logId} className="border-b border-slate-800 hover:bg-slate-850 transition font-mono text-[11px]">
                    <td className="p-2 border-r border-slate-800 text-slate-500 text-center">{i + 1}</td>
                    <td className="p-2 border-r border-slate-800 text-slate-400 text-[10px]">{new Date(l.timestamp).toLocaleTimeString()}</td>
                    <td className="p-2 border-r border-slate-800 text-cyan-400 font-medium truncate max-w-[80px]" title={l.user}>{l.user}</td>
                    <td className="p-2 border-r border-slate-800">
                      <span className={`px-1 py-0.2 rounded text-[9px] font-bold ${
                        l.action === 'Vote Submitted' ? 'bg-emerald-950 text-emerald-400' :
                        l.action === 'Duplicate Detection' ? 'bg-red-950 text-red-400 animate-pulse' :
                        l.action === 'Approval' ? 'bg-blue-950 text-blue-400' :
                        l.action === 'Registration' ? 'bg-teal-950 text-teal-400' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {l.action}
                      </span>
                    </td>
                    <td className="p-2 text-slate-300 font-sans leading-relaxed break-words">{l.details}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Airtable Footer Info */}
      <div className="bg-slate-950 border-t border-slate-800 p-2 text-[10px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
          <span>Airtable CDN Connected & Online</span>
        </div>
        <span>HTTPS SSL Activated (128-bit AES)</span>
      </div>
    </div>
  );
}
