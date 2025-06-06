import React from 'react';
import { useRouter } from 'next/router';

const Leson = () => {
  const router = useRouter();
  const { leson } = router.query;

  return (
    <div>
      <h1>Ders: {leson}</h1>
    </div>
  );
};

export default Leson;
