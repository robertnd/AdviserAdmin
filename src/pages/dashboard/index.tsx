import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { useAllAdvisors, useAllEvents } from "@/services/queries";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { AlertCircleIcon, CheckCircleIcon, ClipboardListIcon, FileTextIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Cell, LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";

const intermediaryStatusData = [
  { name: "Active", value: 224, color: "#4ade80" },
  { name: "Pending", value: 70, color: "#fb923c" },
  { name: "Inactive", value: 56, color: "#f87171" },
];

export function Dashboard() {
  const navigate = useNavigate();
  const { data: intermediaryData } = useAllAdvisors();
  const { data: eventsData } = useAllEvents();

  return (
    <MainWrapper>
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Intermediary Status Card */}
          <Card className="md:col-span-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Intermediary Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex mb-4">
                <div className="w-3/5">
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={intermediaryStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          startAngle={90}
                          endAngle={-270}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {intermediaryStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                          <LabelList
                            dataKey="value"
                            position="outside"
                            offset={15}
                            stroke="none"
                            fill="#888"
                            fontSize={12}
                          />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="w-2/5 flex flex-col justify-center space-y-2">
                  {intermediaryStatusData.map((item, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <span className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                      <span>{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="mt-4" onClick={() => navigate("/intermediaries")}>
                VIEW ALL INTERMEDIARIES
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="md:col-span-6">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              {/* <Button variant="outline" className="justify-start" onClick={() => navigate("/intermediaries/new")}>
                <UserIcon className="w-4 h-4 mr-2" />
                Add New Intermediary
              </Button> */}
              <Button variant="outline" className="justify-start" onClick={() => navigate("/intermediaries?status=pending")}>
                <FileTextIcon className="w-4 h-4 mr-2" />
                Review Applications
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => navigate("/reports")}>
                <ClipboardListIcon className="w-4 h-4 mr-2" />
                Generate Reports
              </Button>
            </CardContent>
          </Card>

          {/* Pending Applications Card */}
          <Card className="md:col-span-4">
            <CardContent className="flex flex-col items-center justify-center h-full text-center py-6">
              <AlertCircleIcon className="w-12 h-12 text-orange-500 mb-4" />
              <CardTitle className="text-xl font-semibold mb-2">Pending Applications</CardTitle>
              <p className="text-2xl font-bold text-orange-500 mb-4">-</p>
              <Button variant="outline" size="sm" onClick={() => navigate("/applications?status=pending")}>REVIEW</Button>
            </CardContent>
          </Card>

          {/* Active Intermediaries Card */}
          <Card className="md:col-span-4">
            <CardContent className="flex flex-col items-center justify-center h-full text-center py-6">
              <CheckCircleIcon className="w-12 h-12 text-green-500 mb-4" />
              <CardTitle className="text-xl font-semibold mb-2">Active Intermediaries</CardTitle>
              <p className="text-2xl font-bold text-green-500 mb-4">{intermediaryData?.length}</p>
              <Button variant="outline" size="sm" onClick={() => navigate("/intermediaries?status=active")}>VIEW ALL</Button>
            </CardContent>
          </Card>

          {/* Recent Activities Card */}
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Recent Events</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              {eventsData && eventsData.length > 0 && eventsData.slice(0, 3).map((event, index) => (
                <React.Fragment key={event.id}>
                  <div className="text-sm">
                    <p className="font-semibold">{event.event_type}</p>
                    <p className="text-muted-foreground">{event.user_id} - {new Date(event.create_date).toLocaleString()}</p>
                  </div>
                  {index < 2 && <Separator />}
                </React.Fragment>
              ))}
              {(!eventsData || eventsData.length === 0) && (
                <div className="text-sm text-muted-foreground">No recent activities</div>
              )}
              <Button variant="link" className="mt-2" onClick={() => navigate("/events")}>
                View All Events
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainWrapper>
  );
}