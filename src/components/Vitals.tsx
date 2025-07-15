// export default function ClinicalDesktopUI() {
//   return (
//     <div className="w-full border-2 border-black">
//       {/* Vitals Row */}
//       <div className="flex text-sm font-semibold border-b border-black">
//         {/* 70% Vitals */}
//         <div className="w-[70%] bg-cyan-200 px-2 py-1 flex items-center gap-4">
//           <span className="font-bold">Vitals:</span>
//           <span>Temp: 39°C</span>
//           <span className="ml-2">BP: 128/80 mmHg</span>
//           <span className="ml-2">HR: 92 bpm</span>
//           <span className="ml-2">Weight: 65</span>
//           <span className="ml-2">Height: 171</span>
//         </div>

//         {/* 15% Supporting Notes Header */}
//         <div className="w-[15%] bg-cyan-100 border-l border-black flex items-center justify-center text-center font-semibold">
//           Supporting Notes
//         </div>

//         {/* 15% Smart EMR Header */}
//         <div className="w-[15%]  bg-green-100 border-l   border-black flex items-center justify-center text-center font-semibold">
//           Smart EMR <br />- Powered by AI
//         </div>
//       </div>

//       <div className="flex w-full">
//         {/* Left Doctor Info (13%) */}
//         <div className="w-[13%] bg-white border-r border-black p-3 text-sm flex flex-col justify-center items-center space-y-2">
//     <p className="text-center">
//         <span className="font-bold text-lg text-pink-600">Doctor:</span>
//         <br />
//         Anand Kapoor
//     </p>
//     <hr/><hr/><hr/><hr/><hr/><hr/>
//     <p className="text-center">
//         <span className="font-bold text-lg text-pink-600">Speciality:</span>
//         <br />
//         General Medicine
//     </p>
//     <hr/><hr/><hr/><hr/><hr/><hr/>
//     <p className="text-center">
//         <span className="font-bold text-lg text-pink-600">Date:</span>
//         <br />
//         Today : hh:mm
//     </p>
// </div>


//         {/* Middle Section: 57% */}
// <div className="w-[57%] bg-[#fffbea] p-0 border-r border-black">
//   <div className="flex w-full gap-0">
//     {/* Chief Complaint + ICD */}
//     <div className="w-1/2">
//       <div className="text-center font-bold border border-black py-2 bg-yellow-100">Chief Complaint</div>
//       <div className="border-x border-b border-black p-38 italic text-red-600 bg-white min-h-[100px]">
//         Fever and body aches for 3 days
//       </div>

//       {/* ICD Table */}
// <div className="text-sm ">
//   {/* Duration & Patient History */}
//   <div className="grid grid-cols-4 text-center font-bold bg-blue-100 border border-black">
//     <div className="p-1 border-r border-black col-span-1">Duration</div>
//     <div className="p-1 col-span-3">Patient History</div>
//   </div>

//   {/* ICD | Code | Weightage */}
//   <div className="grid grid-cols-4 text-center font-bold bg-green-100 border-x border-b border-black">
//     <div className="p-1 border-r border-black">ICD</div>
//     <div className="p-1  border-black"></div>
//     <div className="p-1  border-r    border-black">Code</div>
    
//     <div className="p-1">Weightage %</div>
//   </div>

//   {/* Primary ICD Row - A91 */}
//   <div className="grid grid-cols-4 text-center border-x border-b border-black bg-white">
//     <div className="p-1 border-r border-black">Primary ICD</div>
//     <div className="p-1 border-r border-black text-red-600">A91</div>
//     <div className="p-1 border-r border-black"></div>
//     <div className="p-1">81%</div>
//   </div>

//   {/* Primary ICD Row - R50.9 & 81% */}
//   <div className="grid grid-cols-4 text-center border-x border-b border-black bg-white">
//     <div className="p-1 border-r border-black"></div>
//     <div className="p-1 border-r border-black text-red-600">R50.9</div>
//     <div className="p-1 border-r border-black"></div>
//     <div className="p-1"></div>
//   </div>

//   {/* Secondary ICD - First Row */}
//   <div className="grid grid-cols-4 text-center border-x border-b border-black bg-white">
//     <div className="p-1 border-r border-black">-----</div>
//     <div className="p-1 border-r border-black"></div>
//     <div className="p-1 border-r border-black"></div>
//     <div className="p-1"></div>
//   </div>

//   {/* Secondary ICD - Second Row */}
//   {/* Secondary ICD - First Row */}
//   <div className="grid grid-cols-4 text-center border-x border-b border-black bg-white">
//     <div className="p-1 border-r border-black">Secondary ICD</div>
//     <div className="p-1 border-r border-black"></div>
//     <div className="p-1 border-r border-black"></div>
//     <div className="p-1"></div>
//   </div>

//   {/* Secondary ICD - Third Row */}
//   {/* Secondary ICD - First Row */}
//   <div className="grid grid-cols-4 text-center border-x border-b border-black bg-white">
//     <div className="p-1 border-r border-black">-----</div>
//     <div className="p-1 border-r border-black"></div>
//     <div className="p-1 border-r border-black"></div>
//     <div className="p-1"></div>
//   </div>
// </div>

//     </div>

//     {/* Treatment Plan + Investigations Table */}
//     <div className="w-1/2">
//       <div className="text-center font-bold border border-black py-2 bg-yellow-100">Treatment Plan</div>
//       <div className="border-x border-b border-black p-35 italic text-red-600 bg-white min-h-[100px]">
//         Symptomatic treatment, hydration, rest, and follow-up in 3 days
//       </div>

//       {/* Investigations Table */}
//       <div className="text-sm ">
//         <div className="text-center font-bold border border-black py-1 bg-yellow-100">Investigations</div>

//         <div className="grid grid-cols-2 border-x border-b border-black bg-white">
//           <div className="p-1 border-r border-black">85025</div>
//           <div className="p-1 text-red-600">CBC (Complete Blood Count)</div>
//         </div>
//         <div className="grid grid-cols-2 border-x border-b border-black bg-white">
//           <div className="p-1 border-r border-black">80076</div>
//           <div className="p-1 text-red-600">LFT (Liver Function Test)</div>
//         </div>
//         <div className="grid grid-cols-2 border-x border-b border-black bg-white">
//           <div className="p-1 border-r border-black">86140</div>
//           <div className="p-1 text-red-600">CRP (C-Reactive Protein)</div>
//         </div>
//         <div className="grid grid-cols-2 border-x border-b border-black bg-white">
//           <div className="p-1 border-r border-black">71046</div>
//           <div className="p-1 text-red-600">Chest X-ray</div>
//         </div>
//         <div className="grid grid-cols-2 border-x border-b border-black bg-white">
//           <div className="p-1 border-r border-black">96360</div>
//           <div className="p-1 text-red-600">IV Fluids (Normal Saline)</div>
//         </div>
//         <div className="grid grid-cols-2 border-x border-b border-black bg-white">
//           <div className="p-1 border-r border-black">96365</div>
//           <div className="p-1 text-red-600">IV infusion, up to 1 hour</div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

        

//         {/* Right Section: 30% Split into 15% + 15% */}
//         <div className="w-[30%] flex">
//           {/* 15% Supporting Notes as Table */}
//           <div className="w-[50%] text-sm border-r border-black">
//   {/* Medication Header - Yellow background */}
//   <div className="text-center font-bold border border-black py-2 bg-yellow-100">
//     Medications
//   </div>
  
//   {/* Medicine Rows - White background */}
//   <div className="bg-white">
//     <div className="grid grid-cols-2 border-x border-b border-black">
//       <div className="p-1 border-r border-black">Paracetamol</div>
//       <div className="p-1 text-red-600">500mg TID</div>
//     </div>
//     <div className="grid grid-cols-2 border-x border-b border-black">
//       <div className="p-1 border-r border-black">Azithromycin</div>
//       <div className="p-1 text-red-600">500mg OD</div>
//     </div>
//   </div>
// </div>

//           {/* 15% Smart EMR Buttons */}
//           <div className="w-[50%] bg-green-50 p-5  text-lg">
//             <div className="flex flex-col gap-2">
//               <button className="bg-gray-800 text-white py-4 m-1 rounded">
//                 Medical Coding
//               </button>
//               <button className="bg-blue-500 text-white py-4 m-1  rounded">
//                 AI - Advisory
//               </button>
//               <button className="bg-green-500 text-white py-4 m-1  rounded">
//                 Suggestions
//               </button>
//               <button className="bg-purple-400 text-white py-4 m-1  rounded">
//                 Claims Database
//               </button>
//               <button className="bg-black text-white py-4 m-1  rounded">
//                 Generate E-HR
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


















export default function ClinicalDesktopUI() {
  return (
    <div className="w-full border-2 border-black">
      {/* Vitals Row */}
      <div className="flex flex-col md:flex-row text-sm font-semibold border-b border-black">
        {/* 70% Vitals */}
        <div className="md:w-[70%] w-full bg-cyan-200 px-2 py-1 flex flex-wrap items-center gap-4">
          <span className="font-bold">Vitals:</span>
          <span>Temp: 39°C</span>
          <span>BP: 128/80 mmHg</span>
          <span>HR: 92 bpm</span>
          <span>Weight: 65</span>
          <span>Height: 171</span>
        </div>

        {/* Supporting Notes Header */}
        <div className="md:w-[15%] w-full bg-cyan-100 border-t md:border-l md:border-t-0 border-black flex items-center justify-center text-center font-semibold">
          Supporting Notes
        </div>

        {/* Smart EMR Header */}
        <div className="md:w-[15%] w-full bg-green-100 border-t md:border-l md:border-t-0 border-black flex items-center justify-center text-center font-semibold">
          Smart EMR <br />- Powered by AI
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full">
        {/* Doctor Info */}
        <div className="md:w-[8%] w-full bg-white border-b md:border-b-0 md:border-r border-black p-3 text-sm flex flex-col justify-center items-center space-y-2">
          <p className="text-center">
            <span className="font-bold text-lg text-pink-600">Doctor:</span><br />
            Anand Kapoor
          </p>
          <hr /><hr /><hr /><hr /><hr /><hr />
          <p className="text-center">
            <span className="font-bold text-lg text-pink-600">Speciality:</span><br />
            General Medicine
          </p>
          <hr /><hr /><hr /><hr /><hr /><hr />
          <p className="text-center">
            <span className="font-bold text-lg text-pink-600">Date:</span><br />
            Today : hh:mm
          </p>
        </div>

        {/* Middle Section */}
        <div className="md:w-[62%] w-full bg-[#fffbea] p-0 border-b md:border-b-0 md:border-r border-black">
          <div className="flex flex-col md:flex-row w-full">
            {/* Chief Complaint */}
            <div className="w-full md:w-1/2">
              <div className="text-center font-bold border border-black py-2 bg-yellow-100">Chief Complaint</div>
              <div className="border-x border-b py-20  border-black p-2  italic text-red-600 bg-white min-h-[100px]">
                Fever and body aches for 3 days
              </div>

              {/* ICD Table */}
              <div className="text-sm">
                <div className="grid grid-cols-4 text-center font-bold bg-blue-100 border border-black">
                  <div className="p-1 border-r border-black col-span-1">Duration</div>
                  <div className="p-1 col-span-3">Patient History</div>
                </div>
                <div className="grid grid-cols-4 text-center font-bold bg-green-100 border-x border-b border-black">
                  <div className="p-1 border-r border-black">ICD</div>
                  <div className="p-1 border-black"></div>
                  <div className="p-1 border-r border-black">Code</div>
                  <div className="p-1">Weightage %</div>
                </div>
                <div className="grid grid-cols-4 text-center border-x border-b border-black bg-white">
                  <div className="p-1 border-r border-black">Primary ICD</div>
                  <div className="p-1  border-black text-red-600">A91</div>
                  <div className="p-1 border-r border-black"></div>
                  <div className="p-1">81%</div>
                </div>
                
                <div className="grid grid-cols-4 text-center border-x border-b border-black bg-white">
                  <div className="p-1 border-r border-black">Secondary ICD</div>
                  <div className="p-1 border-r text-red-600 border-black">R50.9</div>
                  <div className="p-1 border-r border-black"></div>
                  <div className="p-1"></div>
                </div>
                <div className="grid grid-cols-4 text-center border-x border-b border-black bg-white">
                  <div className="p-1 border-r border-black">-----</div>
                  <div className="p-1 border-r border-black"></div>
                  <div className="p-1 border-r border-black"></div>
                  <div className="p-1"></div>
                </div>
                <div className="grid grid-cols-4 text-center border-x border-b border-black bg-white">
                  <div className="p-1 border-r border-black">-----</div>
                  <div className="p-1 border-r border-black"></div>
                  <div className="p-1 border-r border-black"></div>
                  <div className="p-1"></div>
                </div>
              </div>
            </div>

            {/* Treatment Plan */}
            <div className="w-full md:w-1/2">
              <div className="text-center font-bold border border-black py-2 bg-yellow-100">Treatment Plan</div>
              <div className="border-x border-b border-black p-2 italic text-red-600 py-20 bg-white min-h-[100px]">
                Symptomatic treatment, hydration, rest, and follow-up in 3 days
              </div>
              <div className="text-sm">
                <div className="text-center font-bold border border-black py-1 bg-yellow-100">Investigations</div>
                {[
                  ["85025", "CBC (Complete Blood Count)"],
                  ["80076", "LFT (Liver Function Test)"],
                  ["86140", "CRP (C-Reactive Protein)"],
                  ["71046", "Chest X-ray"],
                  ["96365", "IV infusion, up to 1 hour"]
                ].map(([code, name]) => (
                  <div key={code} className="grid grid-cols-2 border-x border-b border-black bg-white">
                    <div className="p-1 border-r border-black">{code}</div>
                    <div className="p-1 text-red-600">{name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-[30%] w-full flex flex-col md:flex-row">
          {/* Medications */}
          <div className="w-full md:w-[50%] text-sm border-b md:border-b-0 md:border-r border-black">
            <div className="text-center font-bold border border-black py-2 bg-yellow-100">
              Medications
            </div>
            <div className="bg-white">
              <div className="grid grid-cols-2 border-x border-b border-black">
                <div className="p-1 border-r border-black">Paracetamol</div>
                <div className="p-1 text-red-600">500mg TID</div>
              </div>
              <div className="grid grid-cols-2 border-x border-b border-black">
                <div className="p-1 border-r border-black">Azithromycin</div>
                <div className="p-1 text-red-600">500mg OD</div>
              </div>
            </div>
          </div>

          {/* Smart EMR Buttons */}
          <div className="w-full md:w-[50%] bg-amber-50 p-8 text-base">
            <div className="flex flex-col gap-2">
              <button className="bg-gray-800 text-white py-4 rounded">Medical Coding</button>
              <button className="bg-blue-500 text-white py-4 rounded">AI - Advisory</button>
              <button className="bg-green-500 text-white py-4 rounded">Suggestions</button>
              <button className="bg-purple-400 text-white py-4 rounded">Claims Database</button>
              <button className="bg-black text-white py-4 rounded">Generate E-HR</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
