import { Button } from "@/components/ui/button";
import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { useState } from 'react';
import { ChevronUp, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';

interface Notification {
  id: string;
  icon: string;
  clientName: string;
  message: string;
  date: string;
  action?: string;
}

export function Notifications() {
  const [notifications, ] = useState<Notification[]>([
    { id: '1', icon: 'Birthday', clientName: 'James Burns', message: 'Please note: It is James Burns Birthday today', date: '22:11', action: 'Send A Birthday Message' },
    { id: '2', icon: 'Outstanding', clientName: 'Raymond Reddington', message: 'Please note: Raymond Reddington there are Outstanding Requirement, please refer to the Gateway dashboard', date: '21:11', action: 'View More' },
    { id: '3', icon: 'Contract', clientName: 'Tom Kirkman', message: 'Please note: Investment Contract Anniversary - Old Mutual Wealth Retirement Annuity Investment', date: '20:11', action: 'View More' },
    { id: '4', icon: 'Birthday', clientName: 'Mpumi Nobiva', message: 'Please note: It is Mpumi Nobiva\'s Birthday today', date: '19:11', action: 'Send A Birthday Message' },
    { id: '5', icon: 'Contract', clientName: 'Jack Bouer', message: 'Please note: Investment Contract Anniversary - Old Mutual Wealth Retirement Annuity Investment', date: '18:11', action: 'View More' },
  ]);

  const getInitials = (name: string) => {
    const words = name.split(' ');
    return words.map(word => word[0]).join('').toUpperCase();
  };

  const getIconColor = (iconType: string) => {
    switch (iconType) {
      case 'Birthday': return 'bg-pink-500';
      case 'Outstanding': return 'bg-yellow-500';
      case 'Contract': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <MainWrapper>
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="bg-gray-100 p-2 flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="rotate-45">⟳</Button>
        </div>
        <div className="flex items-center space-x-2">
          <span>1</span>
          <span>-</span>
          <span>2</span>
          <Button variant="ghost" size="icon"><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>
      <div className="bg-white shadow-sm">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-sm font-semibold">TODAY, 22 AUGUST</h2>
          <ChevronUp className="h-5 w-5 text-gray-500" />
        </div>
        <div>
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start p-4 border-b">
              <div className={`flex-shrink-0 mr-4 w-10 h-10 rounded-full ${getIconColor(notification.icon)} flex items-center justify-center text-white font-bold`}>
                {getInitials(notification.clientName)}
              </div>
              <div className="flex-grow">
                <p className="text-xs font-semibold text-gray-500">CLIENT NAME: {notification.clientName}</p>
                <p className="text-sm mt-1">{notification.message}</p>
                {notification.action && (
                  <Button
                    variant="link"
                    size="sm"
                    className="text-blue-600 hover:text-blue-800 p-0 mt-1 text-xs"
                  >
                    {notification.action} →
                  </Button>
                )}
              </div>
              <div className="flex flex-col items-end ml-2">
                <MoreVertical className="h-5 w-5 text-gray-400 mb-2" />
                <span className="text-xs text-gray-400">{notification.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white shadow-sm mt-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-sm font-semibold">TUESDAY, 21 AUGUST</h2>
          <ChevronUp className="h-5 w-5 text-gray-500" />
        </div>
        {/* Add more notifications for this date if needed */}
      </div>
    </MainWrapper>
  );
}
