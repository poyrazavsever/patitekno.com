import React from 'react';
import { useRouter } from 'next/router';

const Lesson = () => {
  const router = useRouter();
  const { lesson } = router.query;

  return (
    <div>
      <h1>Ders: {lesson}</h1>
    </div>
  );
};

export default Lesson;
