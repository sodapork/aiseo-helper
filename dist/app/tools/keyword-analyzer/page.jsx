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
import { Search, TrendingUp, Target, BarChart3, Zap, ArrowLeft, Download, Share2 } from 'lucide-react';
import Link from 'next/link';
export default function KeywordAnalyzer() {
    var _this = this;
    var _a, _b;
    var _c = useState(''), keyword = _c[0], setKeyword = _c[1];
    var _d = useState(false), isAnalyzing = _d[0], setIsAnalyzing = _d[1];
    var _e = useState(null), analysis = _e[0], setAnalysis = _e[1];
    var _f = useState([]), analysisHistory = _f[0], setAnalysisHistory = _f[1];
    var analyzeKeyword = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!keyword.trim())
                        return [2 /*return*/];
                    setIsAnalyzing(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('/api/keyword-analysis', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ keyword: keyword })
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
                        keyword: keyword,
                        aiRelevance: 0,
                        semanticScore: 0,
                        contextStrength: 0,
                        llmUnderstanding: 0,
                        suggestions: ['Error fetching analysis. Please try again.'],
                        relatedTerms: [],
                        aiContext: 'An error occurred while contacting the analysis API.'
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
    return (<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-5 h-5"/>
                <span>Back to Tools</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
                <Search className="w-5 h-5 text-white"/>
              </div>
              <span className="text-xl font-bold text-gray-900">LLM Keyword Analyzer</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-600 hover:text-blue-600 transition-colors">
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
            LLM Keyword Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Analyze how AI systems understand and process your keywords. Get insights into semantic relevance, context strength, and LLM understanding to optimize for AI-powered discovery.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex space-x-4">
              <input type="text" value={keyword} onChange={function (e) { return setKeyword(e.target.value); }} placeholder="Enter a keyword to analyze for AI systems..." className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" onKeyPress={function (e) { return e.key === 'Enter' && analyzeKeyword(); }}/>
              <button onClick={analyzeKeyword} disabled={isAnalyzing || !keyword.trim()} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2">
                {isAnalyzing ? (<>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </>) : (<>
                    <Search className="w-4 h-4"/>
                    <span>Analyze</span>
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
                  <h3 className="text-lg font-semibold text-gray-900">AI Relevance</h3>
                  <Target className="w-5 h-5 text-blue-600"/>
                </div>
                <div className={"text-3xl font-bold ".concat(getScoreColor(analysis.aiRelevance))}>
                  {analysis.aiRelevance}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How relevant this keyword is to AI systems</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Semantic Score</h3>
                  <BarChart3 className="w-5 h-5 text-green-600"/>
                </div>
                <div className={"text-3xl font-bold ".concat(getScoreColor(analysis.semanticScore))}>
                  {analysis.semanticScore}%
                </div>
                <p className="text-sm text-gray-600 mt-2">Semantic understanding by AI models</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Context Strength</h3>
                  <Zap className="w-5 h-5 text-yellow-600"/>
                </div>
                <div className={"text-3xl font-bold ".concat(getScoreColor(analysis.contextStrength))}>
                  {analysis.contextStrength}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How well AI can contextualize this keyword</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">LLM Understanding</h3>
                  <TrendingUp className="w-5 h-5 text-purple-600"/>
                </div>
                <div className={"text-3xl font-bold ".concat(getScoreColor(analysis.llmUnderstanding))}>
                  {analysis.llmUnderstanding}%
                </div>
                <p className="text-sm text-gray-600 mt-2">Overall LLM comprehension level</p>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* AI Context */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Context Analysis</h3>
                <p className="text-gray-600 leading-relaxed">{analysis.aiContext}</p>
              </div>

              {/* Suggestions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Optimization Suggestions</h3>
                <ul className="space-y-2">
                  {((_a = analysis.suggestions) !== null && _a !== void 0 ? _a : []).map(function (suggestion, index) { return (<li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{suggestion}</span>
                    </li>); })}
                </ul>
              </div>
            </div>

            {/* Related Terms */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Terms for AI Systems</h3>
              <div className="flex flex-wrap gap-2">
                {((_b = analysis.relatedTerms) !== null && _b !== void 0 ? _b : []).map(function (term, index) { return (<span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors cursor-pointer">
                    {term}
                  </span>); })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4"/>
                <span>Export Report</span>
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Share2 className="w-4 h-4"/>
                <span>Share Analysis</span>
              </button>
            </div>
          </motion.div>)}

        {/* Analysis History */}
        {analysisHistory.length > 0 && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Analyses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysisHistory.slice(1).map(function (item, index) { return (<div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.keyword}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">AI Relevance</span>
                    <span className={"font-semibold ".concat(getScoreColor(item.aiRelevance))}>{item.aiRelevance}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">LLM Understanding</span>
                    <span className={"font-semibold ".concat(getScoreColor(item.llmUnderstanding))}>{item.llmUnderstanding}%</span>
                  </div>
                </div>); })}
            </div>
          </motion.div>)}
      </div>
    </div>);
}
