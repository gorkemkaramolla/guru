import React from 'react';
import { Formik } from 'formik';
interface Props {}

const Title: React.FC<Props> = () => {
  const handleTitleSubmit = () => {};
  return (
    <div>
      <Formik
        onSubmit={handleTitleSubmit}
        initialValues={{ title: 'Your Title' }}
      ></Formik>
    </div>
  );
};

export default Title;
