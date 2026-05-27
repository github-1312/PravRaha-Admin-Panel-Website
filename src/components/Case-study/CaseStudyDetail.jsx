import React  from "react";


const CaseStudyDetail = ({ study, onBack })=> {
  if (!study) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl border p-4 rounded-lg">
      <button onClick={onBack} className="mb-4 text-blue-600">
        ← Back
      </button>
      <h2 className="text-2xl font-bold mb-2">{study.company}</h2>
      <p className="text-gray-600">{study.industry}</p>
      <img src={study.image} alt={study.company} className="my-4 max-h-64" />
      <p><strong>Challenge:</strong> {study.challenge}</p>
      <p><strong>Solution:</strong> {study.solution}</p>
      <p className="mt-2"><strong>Results:</strong></p>
      <ul className="list-disc ml-6">
        <li>Sales Increase: {study.results.salesIncrease}</li>
        <li>Lead Quality: {study.results.leadQuality}</li>
        <li>Time Reduction: {study.results.timeReduction}</li>
      </ul>
    </div>
  );
}


export default CaseStudyDetail;