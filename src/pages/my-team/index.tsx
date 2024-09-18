import React from 'react';
import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

function PersonalInfoCard() {
  return (
    <Card className="w-full h-full"> 
      <CardHeader>
        <CardTitle className="text-xl font-bold">Yolanda Nkosi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border-t pt-4 mt-2">
          <ul className="space-y-3">
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Female
            </li>
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              13 January, 1988
            </li>
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
              </svg>
              181022308630083
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactDetailsCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Contact Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border-t pt-4 mt-2">
          <ul className="space-y-4">
            <li>
              <p className="text-gray-500">Cellphone number</p>
              <p>0845556476</p>
            </li>
            <li className="flex flex-col justify-between sm:flex-row">
              <div>
                <p className="text-gray-500">Email id</p>
                <p>gnkosi@gmail.com</p>
              </div>
              <div className='mt-4 sm:mt-0'>
                <p className="text-gray-500">Email id</p>
                <p>gnkosi@oldmutual.com</p>
              </div>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function BusinessAddressCard() {
  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="h-[200px] bg-gray-200">
          {/* Placeholder for map image */}
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Map Image Placeholder
          </div>
        </div>
        <div className="p-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <p>93 Rivonia Road, Sandton</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function MyTeam() {
  const name = "Yolanda Nkosi";
  const initials = getInitials(name);

  return (
    <MainWrapper>
      <div className="bg-[#1E1E2D] h-[100px] rounded-lg mb-6 relative">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center text-white text-2xl font-bold">
            {initials}
          </div>
        </div>
      </div>
      <div className="text-center mt-14 mb-6">
        <h2 className="text-xl font-semibold">{name}</h2>
        <div className="w-12 h-1 bg-green-500 mx-auto mt-2"></div>
      </div>

      <div className="flex gap-1 flex-col lg:flex-row">
        <div className="lg:w-[calc(50%-0.5px)]">
          <PersonalInfoCard />
        </div>
        <div className="flex flex-col space-y-2 lg:w-[calc(50%-0.5px)] lg:space-y-1">
          <ContactDetailsCard />
          <BusinessAddressCard />
        </div>
      </div>
    </MainWrapper>
  );
}
