import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-base-brown-100 p-10 text-base-brown-600">
      {/* Typography test */}
      <h1 className="text-headline-1">Headline 1 - 52px</h1>
      <h2 className="text-headline-2 mt-4">Headline 2 - 40px</h2>
      <h3 className="text-headline-3 mt-4">Headline 3 - 24px</h3>
      <h4 className="text-headline-4 mt-4">Headline 4 - 20px</h4>

      <p className="text-body-1 mt-6">
        Body 1 – 16px
      </p>
      <p className="text-body-2 mt-2">
        Body 2 – 14px
      </p>
      <p className="text-body-3 mt-2">
        Body 3 – 12px
      </p>

      {/* Base color test */}
      <div className="mt-10">
        <p className="text-headline-4 mb-3">Base colors</p>

        <div className="flex gap-3 flex-wrap">
          <ColorBox name="brown-600" className="bg-base-brown-600" text="text-base-white" />
          <ColorBox name="brown-500" className="bg-base-brown-500" text="text-base-white" />
          <ColorBox name="brown-400" className="bg-base-brown-400" text="text-base-white" />
          <ColorBox name="brown-300" className="bg-base-brown-300" text="text-base-brown-600" />
          <ColorBox name="brown-200" className="bg-base-brown-200" text="text-base-brown-600" />
          <ColorBox name="brown-100" className="bg-base-brown-100 border border-base-brown-300" text="text-base-brown-600" />
          <ColorBox name="white" className="bg-base-white border border-base-brown-300" text="text-base-brown-600" />
        </div>
      </div>

      {/* Brand buttons */}
      <div className="mt-10">
        <p className="text-headline-4 mb-3">Brand colors</p>

        <div className="flex gap-3 flex-wrap">
          <ColorBox name="brand-orange" className="bg-brand-orange" text="text-base-white" />
          <ColorBox name="brand-green" className="bg-brand-green" text="text-base-white" />
          <ColorBox name="brand-green-soft" className="bg-brand-green-soft" text="text-base-white" />
          <ColorBox name="brand-red" className="bg-brand-red" text="text-base-white" />
        </div>
      </div>
    </div>
  );
}

function ColorBox({ name, className, text }) {
  return (
    <div
      className={`h-24 w-50 rounded-lg flex items-center justify-center ${className}`}
    >
      <span className={`text-body-1 ${text}`}>{name}</span>
    </div>
  );
}

export default App
