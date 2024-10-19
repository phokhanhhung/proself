"use client"
import Image from "next/image";
import { Quill } from "react-quill";
import './Editor.scss';
import 'quill/dist/quill.snow.css';
import { useEffect } from "react";

const QuillEditor = () => {

  useEffect(() => {
    const quill = new Quill('#editor', {
      modules: {
        toolbar: '#toolbar',
        
      },
      placeholder: 'Compose an epic...',
    });


  }, []);

  return (
    <div className="quill-editor">
      <div id="toolbar">
        <button className="ql-size-container">
          <Image 
            src="/assets/icons/editor-size.svg" 
            width={17} 
            height={12} 
            alt="editor-bold" 
          />
          <select className="ql-size">
            <option value="small">Small</option>
            <option selected value="">Normal</option>
            <option value="large">Large</option>
            <option value="huge">Huge</option>
          </select>
        </button>

        <button className="ql-bold">
          <Image 
            src="/assets/icons/editor-bold.svg" 
            width={12} 
            height={12} 
            alt="editor-bold" 
          />
        </button>

        <button className="ql-italic">
          <Image 
            src="/assets/icons/editor-italic.svg" 
            width={12} 
            height={12} 
            alt="editor-bold" 
          />
        </button>

        <button className="ql-underline">
          <Image 
            src="/assets/icons/editor-underline.svg" 
            width={10} 
            height={12} 
            alt="editor-bold" 
          />
        </button>

        <button className="ql-strike">
          <Image 
            src="/assets/icons/editor-strike.svg" 
            width={14} 
            height={12} 
            alt="editor-bold" 
          />
        </button>

        <button className="ql-list" value="bullet">
          <Image 
            src="/assets/icons/editor-bullet-list.svg" 
            width={16} 
            height={10} 
            alt="editor-bold" 
          />
        </button>

        <button className="ql-image">
          <Image 
            src="/assets/icons/editor-image.svg" 
            width={14} 
            height={14} 
            alt="editor-bold" 
          />
        </button>
        
        <button className="ql-link">
          <Image 
            src="/assets/icons/editor-link.svg" 
            width={16} 
            height={8} 
            alt="editor-bold" 
          />
        </button>
        
      </div>
      <div id="editor"></div>
    </div>
  );
}

export default QuillEditor;