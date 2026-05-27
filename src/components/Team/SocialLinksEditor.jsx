import React from "react";

export default function SocialLinksEditor({ socialLinks, setSocialLinks }) {
  const handleChange = (index, field, value) => {
    const updated = [...socialLinks];
    updated[index][field] = value;
    setSocialLinks(updated);
  };

  const handleAdd = () => {
    setSocialLinks([...socialLinks, { platform: "", url: "" }]);
  };

  const handleRemove = (index) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {socialLinks.map((link, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            placeholder="Platform (e.g., Twitter)"
            value={link.platform}
            onChange={(e) => handleChange(index, "platform", e.target.value)}
            className="border border-gray-300 rounded-lg p-2 flex-1"
          />
          <input
            type="url"
            placeholder="URL"
            value={link.url}
            onChange={(e) => handleChange(index, "url", e.target.value)}
            className="border border-gray-300 rounded-lg p-2 flex-1"
          />
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="px-3 py-1 bg-red-500 text-white rounded-lg"
          >
            X
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        + Add Link
      </button>
    </div>
  );
}
