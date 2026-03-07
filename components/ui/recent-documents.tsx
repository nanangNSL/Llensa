import { FileText, MoreVertical, ExternalLink } from 'lucide-react'

const documents = [
    { id: 1, name: 'Invoice_2024_03.pdf', type: 'Invoice', status: 'Processed', date: '2 mins ago', accuracy: '99.8%' },
    { id: 2, name: 'Shipping_Manifest.xlsx', type: 'Manifest', status: 'Processing', date: '15 mins ago', accuracy: 'Pending' },
    { id: 3, name: 'Purchase_Order_88.pdf', type: 'PO', status: 'Processed', date: '1 hour ago', accuracy: '98.5%' },
    { id: 4, name: 'Tax_Form_Q1.pdf', type: 'Tax', status: 'Failed', date: '3 hours ago', accuracy: '0%' },
    { id: 5, name: 'Contract_Draft_v2.docx', type: 'Legal', status: 'Processed', date: 'Yesterday', accuracy: '100%' },
]

export default function RecentDocuments() {
    return (
        <div className="premium-card overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recent Documents</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Live extraction status</p>
                </div>
                <button className="text-primary text-[10px] font-bold uppercase tracking-wider hover:underline">
                    View All
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50">
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Document</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Accuracy</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Timestamp</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-slate-50/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-indigo-50 text-primary group-hover:scale-110 transition-transform">
                                            <FileText size={16} />
                                        </div>
                                        <span className="text-sm font-bold text-slate-800 truncate max-w-[150px]">{doc.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase tracking-wider">
                                        {doc.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${doc.status === 'Processed' ? 'bg-emerald-500 animate-pulse' :
                                                doc.status === 'Processing' ? 'bg-amber-500 animate-spin' :
                                                    'bg-rose-500'
                                            }`} />
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${doc.status === 'Processed' ? 'text-emerald-600' :
                                                doc.status === 'Processing' ? 'text-amber-600' :
                                                    'text-rose-600'
                                            }`}>
                                            {doc.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 hidden md:table-cell">
                                    <span className="text-sm font-bold text-slate-700">{doc.accuracy}</span>
                                </td>
                                <td className="px-6 py-4 hidden lg:table-cell">
                                    <span className="text-[10px] font-medium text-slate-400 uppercase">{doc.date}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                            <ExternalLink size={16} />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
