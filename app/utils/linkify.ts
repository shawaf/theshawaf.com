// import Link from "next/link";
// import React from "react";

// const linkify = (text: string): React.ReactNode[] => {
//   return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) => {
//     if (part.match(/https?:\/\/[^\s]+/)) {
//       return (
//         <Link key={i} href={part} className="text-blue-400 underline" target="_blank">
//           {part}
//         </Link>
//       );
//     }
//     return <React.Fragment key={i}>{part}</React.Fragment>;
//   });
// };

// export default function Example() {
//   const text = "Visit https://example.com and https://nextjs.org for more info!";
//   return <p className="text-white">{linkify(text)}</p>; // ✅ Works perfectly
// }
