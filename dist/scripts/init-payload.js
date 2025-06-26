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
import payload from 'payload';
function initPayload() {
    return __awaiter(this, void 0, void 0, function () {
        var configModule, users, adminUser, tools, sampleTools, _i, sampleTools_1, tool, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 12, , 13]);
                    return [4 /*yield*/, import('../payload.config')];
                case 1:
                    configModule = _a.sent();
                    return [4 /*yield*/, payload.init({
                            config: configModule.default,
                        })];
                case 2:
                    _a.sent();
                    console.log('Payload initialized successfully!');
                    console.log("Admin URL: ".concat(payload.getAdminURL()));
                    return [4 /*yield*/, payload.find({
                            collection: 'users',
                            limit: 1,
                        })];
                case 3:
                    users = _a.sent();
                    if (!(users.docs.length === 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, payload.create({
                            collection: 'users',
                            data: {
                                email: 'admin@aiseohelper.com',
                                password: 'admin123',
                                name: 'Admin User',
                                role: 'admin',
                            },
                        })];
                case 4:
                    adminUser = _a.sent();
                    console.log('Created admin user:', adminUser.email);
                    _a.label = 5;
                case 5: return [4 /*yield*/, payload.find({
                        collection: 'tools',
                        limit: 1,
                    })];
                case 6:
                    tools = _a.sent();
                    if (!(tools.docs.length === 0)) return [3 /*break*/, 11];
                    sampleTools = [
                        {
                            name: 'LLM Keyword Analyzer',
                            description: 'Analyze how AI systems understand and process your keywords for better LLM discovery',
                            category: 'Analysis',
                            status: 'active',
                            icon: 'Search',
                            color: 'from-blue-500 to-blue-600',
                            link: '/tools/keyword-analyzer',
                            features: [
                                { feature: 'AI Relevance Scoring' },
                                { feature: 'Semantic Analysis' },
                                { feature: 'Context Strength Evaluation' },
                                { feature: 'LLM Understanding Metrics' },
                            ],
                        },
                        {
                            name: 'AI Content Optimizer',
                            description: 'Optimize your content structure for better AI understanding and recommendations',
                            category: 'Content',
                            status: 'active',
                            icon: 'FileText',
                            color: 'from-green-500 to-green-600',
                            features: [
                                { feature: 'Content Structure Analysis' },
                                { feature: 'AI Readability Scoring' },
                                { feature: 'Semantic Optimization' },
                                { feature: 'Context Enhancement' },
                            ],
                        },
                    ];
                    _i = 0, sampleTools_1 = sampleTools;
                    _a.label = 7;
                case 7:
                    if (!(_i < sampleTools_1.length)) return [3 /*break*/, 10];
                    tool = sampleTools_1[_i];
                    return [4 /*yield*/, payload.create({
                            collection: 'tools',
                            data: tool,
                        })];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 7];
                case 10:
                    console.log('Created sample tools');
                    _a.label = 11;
                case 11:
                    process.exit(0);
                    return [3 /*break*/, 13];
                case 12:
                    error_1 = _a.sent();
                    console.error('Error initializing Payload:', error_1);
                    process.exit(1);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}
initPayload();
