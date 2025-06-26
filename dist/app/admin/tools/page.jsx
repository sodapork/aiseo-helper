'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, ArrowLeft, Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import Link from 'next/link';
export default function ToolsManagementPage() {
    var _a = useState([
        {
            id: '1',
            name: 'LLM Keyword Analyzer',
            description: 'Analyze how AI systems understand and process your keywords for better LLM discovery',
            category: 'Analysis',
            status: 'active',
            icon: 'Search',
            color: 'from-blue-500 to-blue-600',
            link: '/tools/keyword-analyzer',
            features: ['AI Relevance Scoring', 'Semantic Analysis', 'Context Strength Evaluation'],
        },
        {
            id: '2',
            name: 'AI Content Optimizer',
            description: 'Optimize your content structure for better AI understanding and recommendations',
            category: 'Content',
            status: 'active',
            icon: 'FileText',
            color: 'from-green-500 to-green-600',
            features: ['Content Structure Analysis', 'AI Readability Scoring', 'Semantic Optimization'],
        },
        {
            id: '3',
            name: 'Semantic Analyzer',
            description: 'Analyze semantic relationships and context for AI-powered search optimization',
            category: 'Analysis',
            status: 'development',
            icon: 'BarChart3',
            color: 'from-purple-500 to-purple-600',
            features: ['Semantic Mapping', 'Context Analysis', 'Relationship Detection'],
        },
    ]), tools = _a[0], setTools = _a[1];
    var _b = useState(''), searchTerm = _b[0], setSearchTerm = _b[1];
    var _c = useState('all'), selectedCategory = _c[0], setSelectedCategory = _c[1];
    var _d = useState('all'), selectedStatus = _d[0], setSelectedStatus = _d[1];
    var categories = ['all', 'Analysis', 'Content', 'Monitoring', 'Research', 'Optimization', 'Technical'];
    var statuses = ['all', 'active', 'development', 'coming-soon'];
    var filteredTools = tools.filter(function (tool) {
        var matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchTerm.toLowerCase());
        var matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
        var matchesStatus = selectedStatus === 'all' || tool.status === selectedStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });
    var handleDeleteTool = function (id) {
        if (confirm('Are you sure you want to delete this tool?')) {
            setTools(tools.filter(function (tool) { return tool.id !== id; }));
        }
    };
    return (<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-5 h-5"/>
                <span>Back to Admin</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
                <Settings className="w-5 h-5 text-white"/>
              </div>
              <span className="text-xl font-bold text-gray-900">Tools Management</span>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4"/>
              <span>Add Tool</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
              <input type="text" placeholder="Search tools..." value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
              <select value={selectedCategory} onChange={function (e) { return setSelectedCategory(e.target.value); }} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                {categories.map(function (category) { return (<option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>); })}
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
              <select value={selectedStatus} onChange={function (e) { return setSelectedStatus(e.target.value); }} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                {statuses.map(function (status) { return (<option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>); })}
              </select>
            </div>

            <div className="text-sm text-gray-600 flex items-center justify-end">
              {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTools.map(function (tool, index) { return (<motion.div key={tool.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={"w-12 h-12 rounded-lg bg-gradient-to-r ".concat(tool.color, " flex items-center justify-center")}>
                    <span className="text-white font-semibold">{tool.icon.charAt(0)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={"text-xs px-2 py-1 rounded-full ".concat(tool.status === 'active' ? 'bg-green-100 text-green-800' :
                tool.status === 'development' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800')}>
                      {tool.status}
                    </span>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit className="w-4 h-4"/>
                      </button>
                      <button onClick={function () { return handleDeleteTool(tool.id); }} className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4"/>
                      </button>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{tool.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {tool.category}
                  </span>
                  {tool.link && (<Link href={tool.link} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      View Tool →
                    </Link>)}
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {tool.features.slice(0, 2).map(function (feature, idx) { return (<span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        {feature}
                      </span>); })}
                    {tool.features.length > 2 && (<span className="text-xs text-gray-500">
                        +{tool.features.length - 2} more
                      </span>)}
                  </div>
                </div>
              </div>
            </motion.div>); })}
        </div>

        {filteredTools.length === 0 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Settings className="w-16 h-16 mx-auto"/>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </motion.div>)}
      </div>
    </div>);
}
