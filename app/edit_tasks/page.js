// 'use client'; // Add this for client-side interactivity

// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';

// export default function EditTask() {
//   const searchParams = useSearchParams();
//   const [task, setTask] = useState({
//     id: '',
//     name: '',
//   });

//   useEffect(() => {
//     const id = searchParams.get('id');
//     const name = searchParams.get('name');

//     if (id && name) {
//       setTask({ id, name: decodeURIComponent(name) });
//     }
//   }, [searchParams]);

//   const handleSave = () => {
//     alert(`Task Edited:\nID: ${task.id}\nName: ${task.name}`);
//     // Implement saving logic here
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
//       <h1>Edit Task</h1>
//       <div style={{ marginBottom: '15px' }}>
//         <input
//           type="text"
//           value={task.name}
//           onChange={(e) => setTask({ ...task, name: e.target.value })}
//           style={{ padding: '8px', width: '100%', marginBottom: '15px' }}
//         />
//         <button onClick={handleSave} style={{ padding: '10px', width: '100%' }}>
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// }
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
