import React from 'react';

const PageHeader = ({ title, icon, pathpage,title2 }) => {
  return (
    <section className="p-4 bg-[#32333A]" style={{ height: '100px' }}>
      
      <h2 className="text-white text-2xl font-bold mb-2">
        <i className={`fa ${icon} mr-2`}></i> {title}
      </h2>

      
      <hr className="w-full mb-2 border-t border-gray-500" />
      <div className="flex items-center space-x-2 text-gray-400">
        <i className="fa fa-home" style={{color:"white"}}></i> {/* Home icon */}
        <span>/</span>
        <span style={{color:"white"}}>{pathpage}</span>
        <span>{title2?"/":""}</span>
        <span>{title2}</span>
      </div>
    </section>
  );
};

export default PageHeader;