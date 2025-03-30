import React, { useState } from 'react';

function LoginCopy() {
  const [copySuccess, setCopySuccess] = useState('');
  const [copyPasswordSuccess, setCopyPasswordSuccess] = useState('');

  const copyToClipboard = (text, setSuccess) => {
    navigator.clipboard.writeText(text).then(() => {
      setSuccess(`${text === 'admin' ? 'Username' : 'Password'} copied to clipboard!`);
    }, () => {
      setSuccess("Failed to copy text.");
    });
  };

  return (
    <>
    <div className='w-[330px] mt-[20px] bg-[bisque] border border-solid border-[#185519] rounded-[10px] py-[10px] px-[20px]'>
        <p className='text-[#185519] text-[18.72px] font-bold my-[10px]'>Use below credential for testing</p>
        {/* Username text */}
        <p className='text-[#185519] font-bold mb-[10px]'>Username: <span className='font-normal text-black'>admin</span></p>
        <button onClick={() => copyToClipboard("admin", setCopySuccess)} className="bg-[#185519] border-none rounded-[5px] text-white cursor-pointer text-[10px] px-[7px] py-[5px] mb-[10px]">Copy Username</button>
        {copySuccess && <span className="text-blue-700 text-[14px] ml-[10px]">{copySuccess}</span>}

        {/* Password text */}
        <p className='text-[#185519] font-bold mb-[10px]'>Password: <span className='font-normal text-black'>pass1234</span></p>
        <button onClick={() => copyToClipboard("pass1234", setCopyPasswordSuccess)} className="bg-[#185519] border-none rounded-[5px] text-white cursor-pointer text-[10px] px-[7px] py-[5px]">Copy Password</button>
        {copyPasswordSuccess && <span className="text-blue-700 text-[14px] ml-[10px]">{copyPasswordSuccess}</span>}
    </div>
    </>
  )
}

export default LoginCopy