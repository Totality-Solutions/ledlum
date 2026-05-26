
// "use client";

// import { useState, useCallback } from "react"; // 1. Added useCallback
// import Achievements from "./Achievements";
// import ProjectSection from "./ProjectSection";
// import AutoCarousel from "./AutoCarousel";
// import { PopupForm } from "@/components/common/PopupForm";

// const HomeClient = () => {
//   const [showForm, setShowForm] = useState(false);

//   // 2. Wrap the toggle in useCallback to stabilize the function identity
//   const handleTriggerForm = useCallback(() => {
//     setShowForm(true);
//   }, []);

//   return (
//     <div className="relative">
//       {/* 3. Pass the stabilized function instead of an inline arrow function */}
//       <Achievements onTriggerForm={handleTriggerForm} />

//       <ProjectSection />
//       <AutoCarousel />

//       {/* FLOATING POPUP */}
//       {/* {showForm && (
//   <div className="fixed bottom-6 right-6 z-[50] pointer-events-none">
//     <div className="pointer-events-auto">
//       <PopupForm 
//         isVisible={showForm} 
//         onClose={() => setShowForm(false)} 
//       />
//     </div>
//   </div>
// )} */}
      
//     </div>
//   );
// };

// export default HomeClient;



"use client";

import { useState, useCallback } from "react";
import Achievements from "./Achievements";
import ProjectSection from "./ProjectSection";
import AutoCarousel from "./AutoCarousel";
import { PopupForm } from "@/components/common/PopupForm";

// Added { initialPosts } to the props
const HomeClient = ({ initialPosts }: { initialPosts: any }) => {
  const [showForm, setShowForm] = useState(false);

  // 2. Wrap the toggle in useCallback to stabilize the function identity
  const handleTriggerForm = useCallback(() => {
    setShowForm(true);
  }, []);

  return (
    <div className="relative">
      {/* 3. Pass the stabilized function instead of an inline arrow function */}
      <Achievements onTriggerForm={handleTriggerForm} />

      <ProjectSection />
      
      {/* PASS THE SANITY POSTS TO THE CAROUSEL */}
      <AutoCarousel posts={initialPosts} />

      {/* FLOATING POPUP */}
      {/* {showForm && (
        <div className="fixed bottom-6 right-6 z-[50] pointer-events-none">
          <div className="pointer-events-auto">
            <PopupForm 
              isVisible={showForm} 
              onClose={() => setShowForm(false)} 
            />
          </div>
        </div>
      )} */}
      
    </div>
  );
};

export default HomeClient;