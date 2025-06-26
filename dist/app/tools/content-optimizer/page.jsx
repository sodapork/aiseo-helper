'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowLeft, Download, Share2, Zap, Target, MessageSquare, BarChart3, CheckCircle, Lightbulb } from 'lucide-react';
import Link from 'next/link';
export default function ContentOptimizer() {
    var _this = this;
    var _a = useState(''), content = _a[0], setContent = _a[1];
    var _b = useState(false), isAnalyzing = _b[0], setIsAnalyzing = _b[1];
    var _c = useState(null), analysis = _c[0], setAnalysis = _c[1];
    var _d = useState([]), analysisHistory = _d[0], setAnalysisHistory = _d[1];
    var analyzeContent = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!content.trim())
                        return [2 /*return*/];
                    setIsAnalyzing(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('/api/content-optimizer', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ content: content })
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data_1 = _a.sent();
                    setAnalysis(data_1);
                    setAnalysisHistory(function (prev) { return __spreadArray([data_1], prev.slice(0, 4), true); });
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    setAnalysis({
                        content: content,
                        aiReadability: 0,
                        contextClarity: 0,
                        semanticStructure: 0,
                        llmCompatibility: 0,
                        suggestions: [],
                        optimizedContent: '',
                        aiContext: 'Error contacting the content optimization API.'
                    });
                    return [3 /*break*/, 5];
                case 5:
                    setIsAnalyzing(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var getScoreColor = function (score) {
        if (score >= 90)
            return 'text-green-600';
        if (score >= 80)
            return 'text-blue-600';
        if (score >= 70)
            return 'text-yellow-600';
        return 'text-red-600';
    };
    var getScoreBg = function (score) {
        if (score >= 90)
            return 'bg-green-100';
        if (score >= 80)
            return 'bg-blue-100';
        if (score >= 70)
            return 'bg-yellow-100';
        return 'bg-red-100';
    };
    var getPriorityColor = function (priority) {
        switch (priority) {
            case 'high': return 'text-red-600 bg-red-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'low': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };
    var getTypeIcon = function (type) {
        switch (type) {
            case 'structure': return <BarChart3 className="w-4 h-4"/>;
            case 'clarity': return <Target className="w-4 h-4"/>;
            case 'context': return <MessageSquare className="w-4 h-4"/>;
            case 'semantic': return <Zap className="w-4 h-4"/>;
            default: return <Lightbulb className="w-4 h-4"/>;
        }
    };
    return (<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="w-5 h-5"/>
                <span>Back to Tools</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <FileText className="w-5 h-5 text-white"/>
              </div>
              <span className="text-xl font-bold text-gray-900">AI Content Optimizer</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-600 hover:text-green-600 transition-colors">
                <Share2 className="w-5 h-5"/>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI Content Optimizer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Optimize your content structure and clarity for better AI understanding. Get actionable suggestions to improve how AI systems discover, process, and recommend your content.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content to Optimize
              </label>
              <textarea value={content} onChange={function (e) { return setContent(e.target.value); }} placeholder="Paste your content here to get AI optimization suggestions..." className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-gray-900"/>
            </div>
            <div className="flex justify-center">
              <button onClick={analyzeContent} disabled={isAnalyzing || !content.trim()} className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2">
                {isAnalyzing ? (<>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing Content...</span>
                  </>) : (<>
                    <FileText className="w-4 h-4"/>
                    <span>Optimize Content</span>
                  </>)}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        {analysis && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
            {/* Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">AI Readability</h3>
                  <FileText className="w-5 h-5 text-green-600"/>
                </div>
                <div className={"text-3xl font-bold ".concat(getScoreColor(analysis.aiReadability))}>
                  {analysis.aiReadability}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How easily AI can read and parse your content</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Context Clarity</h3>
                  <Target className="w-5 h-5 text-blue-600"/>
                </div>
                <div className={"text-3xl font-bold ".concat(getScoreColor(analysis.contextClarity))}>
                  {analysis.contextClarity}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How clearly AI understands the context</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Semantic Structure</h3>
                  <BarChart3 className="w-5 h-5 text-purple-600"/>
                </div>
                <div className={"text-3xl font-bold ".concat(getScoreColor(analysis.semanticStructure))}>
                  {analysis.semanticStructure}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How well content is semantically organized</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">LLM Compatibility</h3>
                  <Zap className="w-5 h-5 text-yellow-600"/>
                </div>
                <div className={"text-3xl font-bold ".concat(getScoreColor(analysis.llmCompatibility))}>
                  {analysis.llmCompatibility}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How compatible with large language models</p>
              </div>
            </div>

            {/* AI Context */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-600"/>
                <h3 className="text-lg font-semibold text-gray-900">AI Analysis Summary</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{analysis.aiContext}</p>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <CheckCircle className="w-5 h-5 text-green-600"/>
                <h3 className="text-lg font-semibold text-gray-900">Optimization Suggestions</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.suggestions.map(function (suggestion, index) { return (<div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(suggestion.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                          <span className={"text-xs px-2 py-1 rounded-full ".concat(getPriorityColor(suggestion.priority))}>
                            {suggestion.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                        {suggestion.example && (<div className="bg-gray-50 rounded p-2">
                            <p className="text-xs text-gray-500 mb-1">Example:</p>
                            <p className="text-sm text-gray-700">{suggestion.example}</p>
                          </div>)}
                      </div>
                    </div>
                  </div>); })}
              </div>
            </div>

            {/* Optimized Content */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-green-600"/>
                  <h3 className="text-lg font-semibold text-gray-900">Optimized Content</h3>
                </div>
                <button className="text-green-600 hover:text-green-700 transition-colors">
                  <Download className="w-5 h-5"/>
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{analysis.optimizedContent}</pre>
              </div>
            </div>
          </motion.div>)}

        {/* History Section */}
        {analysisHistory.length > 0 && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="bg-white rounded-xl shadow-sm p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Analyses</h3>
            <div className="space-y-3">
              {analysisHistory.slice(1).map(function (item, index) { return (<div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.content.substring(0, 100)}...
                    </p>
                    <p className="text-xs text-gray-500">
                      AI Readability: {item.aiReadability}% | LLM Compatibility: {item.llmCompatibility}%
                    </p>
                  </div>
                  <button onClick={function () { return setAnalysis(item); }} className="text-green-600 hover:text-green-700 text-sm font-medium">
                    View Details
                  </button>
                </div>); })}
            </div>
          </motion.div>)}
      </div>
    </div>);
}
