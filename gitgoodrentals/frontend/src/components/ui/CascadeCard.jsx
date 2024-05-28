import React from 'react';

const CascadeCard = ({ title, description }) => {
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden relative group p-6 z-0">
      <div className="circle absolute h-36 w-36 -top-16 -right-16 rounded-full bg-primary group-hover:scale-[600%] duration-500 z-[-1] op"></div>
      <h3 className="text-2xl font-bold mb-4 group-hover:text-card-foreground duration-500">
        {title}
      </h3>
      <p className="text-card-foreground mb-6">{description}</p>
      <button className="text-sm font-semibold text-primary group-hover:text-primary-foreground duration-500">
        <i className="ml-2 fas fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default CascadeCard;
