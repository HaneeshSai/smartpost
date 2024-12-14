import React from "react";

export default function App() {
  return (
    <div className="flex bg-gradient-to-br from-slate-700 to-slate-800 h-screen flex-col px-20 text-lg text-white pt-10 items-center">
      <h1 className="text-4xl mb-2 font-medium ">Smart Post AI</h1>
      <p>
        An AI-Based Tool for Optimising Social Media Strategy and Engagement
      </p>
      <div className="flex gap-10 w-full mt-10 mx-">
        <div className="flex-1 border text-base p-5 bg-slate-900 border-slate-200 rounded-xl">
          <h1>How it Works ?</h1>
          <div class="p-4 rounded-md">
            <ul class="list-disc pl-6 space-y-3">
              <li>
                We require details about your business niche, current followers,
                current reach, target follower count, target reach, and a list
                of competitors excelling in your niche.
              </li>
              <li>
                Our initial approach involves leveraging web scraping
                technologies to analyze competitors' Instagram profiles. This
                includes examining their post content, captions, and engagement
                metrics (e.g., likes, comments, and shares).
              </li>
              <li>
                Using advanced AI/ML techniques, we generate insights to
                identify the type of content you should post to effectively
                achieve your target goals.
              </li>
              <li>
                Finally, we perform a comprehensive analysis of your existing
                profile, compare it against the derived insights, and provide a
                tailored, end-to-end content strategy with weekly updates.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5 text-base p-5 border bg-slate-900 border-slate-200 rounded-xl">
          <label htmlFor="">
            Your Social Media Username:{" "}
            <input
              type="text"
              className="bg-[#fff0] outline-none px-1  border border-slate-300 rounded"
            />
          </label>
          <label htmlFor="">
            Your Business Niche:{" "}
            <input
              type="text"
              className="bg-[#fff0] outline-none px-1  border border-slate-300 rounded"
            />
            <span className="text-xs">
              (Fashion Brand, Restaurent Chain, Health Care, Fitness)
            </span>
          </label>{" "}
          <label htmlFor="">
            Your Top Competeters:{" "}
            <input
              type="text"
              className="bg-[#fff0] outline-none px-1  border border-slate-300 rounded"
            />
            <span className="text-xs ml-1">(Comma Seperated Values)</span>
          </label>{" "}
          <label htmlFor=""></label>
        </div>
      </div>
    </div>
  );
}
