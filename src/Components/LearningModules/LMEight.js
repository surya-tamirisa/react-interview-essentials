import React, { Suspense } from "react";

// const RandomComponent = () => {
//     return <div>This is a lazily loaded component!</div>;
//   };
// Lazy load components
const LazyComponent = React.lazy(() => import('../LearningModules/FillerComponent'));

const LMEight = () => {
  return (
    <div>
      <h1>React Suspense Example: Lazy Loading</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
};

export default LMEight;

