import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

const Categories = () => {
  const categoryList = [
    { id: 1, name: 'Yazılım' },
    { id: 2, name: 'Tasarım' },
    { id: 3, name: 'Kariyer' },
    { id: 4, name: 'Günlük' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
      {categoryList.map((cat) => (
        <div
          key={cat.id}
          className="border border-neutral-300 rounded-md p-4 flex items-center justify-between"
        >
          <span className="font-medium text-textColor">{cat.name}</span>
          <div className="flex items-center gap-2">
            <button className="text-blue-600 hover:opacity-60 transition cursor-pointer">
              <MdEdit size={20} />
            </button>
            <button className="text-red-600 hover:opacity-60 transition cursor-pointer">
              <MdDelete size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
