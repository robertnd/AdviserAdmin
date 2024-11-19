import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { useAllEvents } from '@/services/queries';
import { format } from "date-fns";
import { 
  ArrowRight, 
  ChevronDown, 
  Filter, 
  LogIn, 
  RefreshCw, 
  Search, 
  Settings, 
  Shield 
} from 'lucide-react';
import { useState } from "react";

export function Events() {
  const { data: events } = useAllEvents();
  const [searchTerm, setSearchTerm] = useState('');

  const getEventIcon = (eventType: string) => {
    switch (eventType.toLowerCase()) {
      case 'sign in':
        return <LogIn className="h-5 w-5" />;
      case 'security':
        return <Shield className="h-5 w-5" />;
      case 'system':
        return <Settings className="h-5 w-5" />;
      default:
        return <ArrowRight className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const groupEventsByDate = (events: any[]) => {
    return events?.reduce((groups: any, event) => {
      const date = format(new Date(event.create_date), 'yyyy-MM-dd');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    }, {}) || {};
  };

  const groupedEvents = groupEventsByDate(events!);

  return (
    <MainWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">System Events</h1>
            <p className="text-sm text-gray-500 mt-1">Track and monitor system activities</p>
          </div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search events..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Event Timeline */}
        <div className="space-y-6">
          {Object.entries(groupedEvents).map(([date, dateEvents]: [string, any]) => (
            <div key={date} className="bg-white rounded-lg shadow-sm border">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-sm font-semibold">
                  {format(new Date(date), 'EEEE, dd MMMM yyyy')}
                </h2>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </div>
              <div className="divide-y">
                {dateEvents.map((event: any) => (
                  <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg bg-gray-100`}>
                        {getEventIcon(event.event_type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{event.user_id}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              {event.event_type} - {event.process}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${getStatusColor(event.status)}`}>
                              {event.status}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {format(new Date(event.create_date), 'HH:mm:ss')}
                            </p>
                          </div>
                        </div>
                        {event.endpoint && (
                          <p className="text-sm text-gray-500 mt-2">
                            Endpoint: {event.endpoint}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainWrapper>
  );
}
