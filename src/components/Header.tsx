// components/PatientHeader.tsx
export default function Header() {
  return (
    <div className="w-full font-sans">
      {/* Desktop View - Dark bordered table with sky blue */}
      <div className="hidden md:grid grid-cols-12 bg-sky-200 overflow-x-auto border-2 border-gray-800">
        {/* Patient Name */}
        <div className="col-span-1 flex items-center justify-start p-2 border-r-2 border-gray-800">
          <span className="font-bold text-lg">Patient Name</span>
        </div>
        <div className="col-span-1 flex items-center p-2 border-r-2 border-gray-800">
          <span>RAJ</span>
        </div>
        
        {/* Gender */}
        <div className="col-span-1 flex items-center justify-start p-2 border-r-2 border-gray-800">
          <span className="font-bold text-lg">Gender</span>
        </div>
        <div className="col-span-1 flex items-center p-2 border-r-2 border-gray-800">
          <span>Male</span>
        </div>
        
        {/* Age */}
        <div className="col-span-1 flex items-center justify-start p-2 border-r-2 border-gray-800">
          <span className="font-bold text-lg">Age</span>
        </div>
        <div className="col-span-1 flex items-center p-2 border-r-2 border-gray-800">
          <span>34</span>
        </div>
        
        {/* NATID */}
        <div className="col-span-1 flex items-center justify-start p-2 border-r-2 border-gray-800">
          <span className="font-bold text-lg">NAT ID</span>
        </div>
        <div className="col-span-1 flex items-center p-2 border-r-2 border-gray-800">
          <span className="truncate">XOOCXOOOCXO00000C</span>
        </div>
        
        {/* Nationality */}
        <div className="col-span-1 flex items-center justify-start p-2 border-r-2 border-gray-800">
          <span className="font-bold text-lg">Nationality</span>
        </div>
        <div className="col-span-1 flex items-center p-2 border-r-2 border-gray-800">
          <span>INDIAN</span>
        </div>
        
        {/* Insurance */}
        <div className="col-span-1 flex items-center justify-start p-2 border-r-2 border-gray-800">
          <span className="font-bold text-lg">Insurance</span>
        </div>
        <div className="col-span-1 flex items-center p-2">
          <span>ABC Insurance</span>
        </div>
      </div>

      {/* Mobile View - Dark bordered cards with sky blue */}
      <div className="md:hidden bg-sky-200 p-3 rounded-lg border-1.5 border-gray-800">
        <div className="grid grid-cols-2 gap-2">
          <span className="font-bold text-lg border-b-2 border-gray-800 pb-1">Patient Name</span>
          <span className="border-b-2 border-gray-800 pb-1">RAJ</span>
          
          <span className="font-bold text-lg border-b-2 border-gray-800 pb-1">Gender</span>
          <span className="border-b-2 border-gray-800 pb-1">Male</span>
          
          <span className="font-bold text-lg border-b-2 border-gray-800 pb-1">Age</span>
          <span className="border-b-2 border-gray-800 pb-1">34</span>
          
          <span className="font-bold text-lg border-b-2 border-gray-800 pb-1">NATID</span>
          <span className="border-b-2 border-gray-800 pb-1 truncate">XOOCXOOOCXO00000C</span>
          
          <span className="font-bold text-lg border-b-2 border-gray-800 pb-1">Nationality</span>
          <span className="border-b-2 border-gray-800 pb-1">INDIAN</span>
          
          <span className="font-bold text-lg">Insurance</span>
          <span>ABC Insurance</span>
        </div>
      </div>

      {/* CLINICAL DATA SUITE title with cream background and dark border */}
      <div className="text-center border-2 bg-amber-50 font-bold py-2 tracking-wider text-xl border-t-2 border-b-2 border-gray-800">
        CLINICAL DATA SUITE
      </div>
    </div>
  );
}