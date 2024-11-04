import { Button } from "@/components/ui/button";
import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { useAllEvents } from '@/services/queries';
import { ChevronUp, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';


export function Events() {
  const { data: events } = useAllEvents();
    
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const getIconColor = (iconType: string) => {
    switch (iconType) {
      case 'Login': return 'bg-red-500';
      case 'Approval': return 'bg-yellow-500'
      case 'System': return 'bg-green-500';
      case 'Announcement': return 'bg-blue-500';
      case 'Security': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <MainWrapper>
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <div className="bg-gray-100 p-2 flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="rotate-45">⟳</Button>
        </div>
        <div className="flex items-center space-x-2">
          <span>1</span>
          <span>-</span>
          <span>5</span>
          <Button variant="ghost" size="icon"><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>
      <div className="bg-white shadow-sm">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-sm font-semibold">TODAY, 22 AUGUST</h2>
          <ChevronUp className="h-5 w-5 text-gray-500" />
        </div>
        <div>
          {events?.map((event) => (
            <div key={event.event_id} className="flex items-start p-4 border-b">
              <div className={`flex-shrink-0 mr-4 w-10 h-10 rounded-full ${getIconColor(event.user_id)} flex items-center justify-center text-white font-bold`}>
                {getInitials(event.user_id)}
              </div>
              <div className="flex-grow">
                <p className="text-xs font-semibold text-gray-500">EVENT TYPE: {event.event_type}</p>
                <p className="text-sm mt-1">{event.user_id}</p>
                {event.action && (
                  <Button
                    variant="link"
                    size="sm"
                    className="text-blue-600 hover:text-blue-800 p-0 mt-1 text-xs"
                  >
                    {event.action} →
                  </Button>
                )}
              </div>
              <div className="flex flex-col items-end ml-2">
                <MoreVertical className="h-5 w-5 text-gray-400 mb-2" />
                <span className="text-xs text-gray-400">{event.status}</span>
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
        {/* Add more event logs for this date if needed */}
      </div>
    </MainWrapper>
  );
}
