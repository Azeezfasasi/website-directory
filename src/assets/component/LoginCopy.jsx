import React, { useState } from "react";

function LoginCopy() {
  const [copySuccess, setCopySuccess] = useState('');
  const [copyPasswordSuccess, setCopyPasswordSuccess] = useState('');

  const copyToClipboard = async (text, setSuccess) => {
    try {
      await navigator.clipboard.writeText(text);
      setSuccess(`${text === 'admin' ? 'Username' : 'Password'} copied to clipboard!`);
      setTimeout(() => setSuccess(''), 2000); // Clears message after 2s
    } catch (error) {
      setSuccess("Failed to copy text.");
    }
  };
  

  return (
    <div className="w-full max-w-sm bg-white shadow-lg border border-gray-200 rounded-lg p-2 mt-6 text-left z-[9999]">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Use these demo credentials for testing</h3>

      {/* Username Section */}
      <div className="mb-4">
        <p className="text-green-600 font-medium">
          Username: <span className="font-normal text-black">demo@webdirectory.com</span>
        </p>
        <button
          onClick={() => copyToClipboard("demo@webdirectory.com", setCopySuccess)}
          className="mt-2 bg-green-600 text-white text-sm px-4 py-1 rounded-lg hover:bg-green-700 transition cursor-pointer"
        >
          Copy Username
        </button>
        {copySuccess && <span className="block text-sm text-green-600 mt-2">{copySuccess}</span>}
      </div>

      {/* Password Section */}
      <div>
        <p className="text-green-600 font-medium">
          Password: <span className="font-normal text-black">demo1234</span>
        </p>
        <button
          onClick={() => copyToClipboard("demo1234", setCopyPasswordSuccess)}
          className="mt-2 bg-green-600 text-white text-sm px-4 py-1 rounded-lg hover:bg-green-700 transition cursor-pointer"
        >
          Copy Password
        </button>
        {copyPasswordSuccess && <span className="block text-sm text-green-600 mt-2">{copyPasswordSuccess}</span>}
      </div>
    </div>
  );
}

export default LoginCopy;
