import { useState } from "react";
import openai from "./lib/openai";

const prompt = `
  あなたはシニアエンジニアです。
  渡されたコードの
  問題点、修正点、改善内容を記載してください。
  回答はmarkdownでタイトルには###としてください。
`;

function App() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");

  const review = async () => {
    const messages = [{
      role: "user",
      content: prompt + content,
    }];
    try {
      const result = await openai.completion(messages);
      setResult(result);
    } catch (error) {
      console.error("Error during review:", error);
      setResult("エラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
      <header className="flex w-full max-w-5xl justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold text-blue-900">AI Code Reviewer</h1>
      </header>
      <main className="flex w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden h-[70vh]">
        <div className="flex flex-col w-1/2 h-full bg-gray-900 overflow-y-auto">
          <div className="flex-1 p-4 text-white">
            <textarea onChange={(e) => setContent(e.target.value)} className="h-full w-full bg-transparent text-white resize-none outline-none" />
          </div>
          <button onClick={review} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">
            レビューする
          </button>
        </div>
        <div className="flex flex-col w-1/2 h-full items-center justify-center">
          <div className="p-4 overflow-y-auto w-full">
            {result}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

