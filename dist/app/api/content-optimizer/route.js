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
import { NextResponse } from 'next/server';
export function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var content, prompt, response, data, contentResp, result, error_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, req.json()];
                case 1:
                    content = (_d.sent()).content;
                    prompt = "\n    Analyze and optimize the following content for AI and LLM understanding:\n    \"\"\"\n    ".concat(content, "\n    \"\"\"\n    \n    Respond ONLY with a valid JSON object with these exact fields:\n    {\n      \"aiReadability\": number, // 0-100\n      \"contextClarity\": number, // 0-100\n      \"semanticStructure\": number, // 0-100\n      \"llmCompatibility\": number, // 0-100\n      \"suggestions\": Array<{ type: string, priority: string, title: string, description: string, example?: string }>,\n      \"optimizedContent\": string,\n      \"aiContext\": string\n    }\n    - aiReadability: How easily AI can read and parse the content\n    - contextClarity: How clearly AI understands the context\n    - semanticStructure: How well the content is semantically organized\n    - llmCompatibility: How compatible the content is with large language models\n    - suggestions: Actionable suggestions for improvement (array of objects)\n    - optimizedContent: An improved version of the content\n    - aiContext: A short summary of the AI's analysis\n  ");
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, fetch('https://api.openai.com/v1/chat/completions', {
                            method: 'POST',
                            headers: {
                                'Authorization': "Bearer ".concat(process.env.OPENAI_API_KEY),
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                model: 'gpt-4',
                                messages: [
                                    { role: 'system', content: 'You are an expert in AI SEO, LLM optimization, and content strategy.' },
                                    { role: 'user', content: prompt }
                                ],
                                temperature: 0.7
                            })
                        })];
                case 3:
                    response = _d.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    data = _d.sent();
                    contentResp = (_c = (_b = (_a = data.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content;
                    result = void 0;
                    try {
                        result = JSON.parse(contentResp);
                    }
                    catch (_e) {
                        result = {};
                    }
                    result = {
                        aiReadability: typeof result.aiReadability === 'number' ? result.aiReadability : 0,
                        contextClarity: typeof result.contextClarity === 'number' ? result.contextClarity : 0,
                        semanticStructure: typeof result.semanticStructure === 'number' ? result.semanticStructure : 0,
                        llmCompatibility: typeof result.llmCompatibility === 'number' ? result.llmCompatibility : 0,
                        suggestions: Array.isArray(result.suggestions) ? result.suggestions : [],
                        optimizedContent: typeof result.optimizedContent === 'string' ? result.optimizedContent : '',
                        aiContext: typeof result.aiContext === 'string' ? result.aiContext : '',
                        content: content,
                    };
                    return [2 /*return*/, NextResponse.json(result)];
                case 5:
                    error_1 = _d.sent();
                    return [2 /*return*/, NextResponse.json({
                            aiReadability: 0,
                            contextClarity: 0,
                            semanticStructure: 0,
                            llmCompatibility: 0,
                            suggestions: [],
                            optimizedContent: '',
                            aiContext: 'Error contacting OpenAI API.',
                            content: content,
                        })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
