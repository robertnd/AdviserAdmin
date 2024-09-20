import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, LabelList } from "recharts";
import { InfoCircledIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { FileIcon, WalletIcon, ArchiveIcon, ChevronRightIcon, PlusIcon, ClipboardCheck, FileTextIcon } from "lucide-react";

const dummyData = [
  { name: "On track", value: 224, color: "#4ade80" },
  { name: "Slightly behind", value: 70, color: "#fb923c" },
  { name: "Not on track", value: 56, color: "#f87171" },
];

export function Servicing() {
  return (
    <MainWrapper>
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-semibold">Servicing</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Goals Card */}
          <Card className="md:col-span-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">My goals</CardTitle>
              <p className="text-sm text-muted-foreground">My goals</p>
            </CardHeader>
            <CardContent>
              <div className="flex mb-4">
                <div className="w-3/5">
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dummyData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          startAngle={90}
                          endAngle={-270}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {dummyData.map((entry, index) => (
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
                  {dummyData.map((item, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <span className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center text-sm text-green-600 mb-4">
                <span className="mr-1">What does each status mean?</span>
                <InfoCircledIcon className="w-4 h-4" />
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 7L18 10M18 10L21 13M18 10L21 7M18 10L15 13" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11 19H6.2C5.0799 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2C3 7.0799 3 6.51984 3 6.09202C3.21799 5.71569 3.40973 5.40973 3.71569 5.21799C4.09202 5 4.51984 5 5.0799 5H17.8C18.9201 5 19.4802 5 19.908 5.21799C20.2843 5.40973 20.5903 5.71569 20.782 6.09202C21 6.51984 21 7.0799 21 8.2V11" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Customer goal tracking</p>
                  <p className="text-muted-foreground">56 customers need urgent assistance. Help get them back on track.</p>
                </div>
              </div>
              <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                TAKE ACTION
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Sales Card */}
          <Card className="md:col-span-3">
            <CardContent className="flex flex-col items-center justify-center h-full text-center py-6">
              <FileTextIcon className="w-12 h-12 text-green-500 mb-4" />
              <CardTitle className="text-xl font-semibold mb-2">Sales</CardTitle>
              <p className="text-sm text-gray-600 mb-4">
                You have <span className="font-semibold">12/120</span> sales<br />applications
              </p>
              <Button variant="outline" size="sm" className="mt-2">VIEW MORE</Button>
            </CardContent>
          </Card>

          {/* Service Requests Card */}
          <Card className="md:col-span-3">
            <CardContent className="flex flex-col items-center justify-center h-full text-center py-6">
              <ClipboardCheck className="w-12 h-12 text-green-500 mb-4" />
              <CardTitle className="text-xl font-semibold mb-2">Service Requests</CardTitle>
              <p className="text-sm text-gray-600 mb-1">
                88 service requests submitted
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-semibold">12/88</span> Need Action
              </p>
              <Button variant="outline" size="sm" className="mt-2">VIEW MORE</Button>
            </CardContent>
          </Card>

          {/* Service Transactions Card */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Service Transactions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileIcon className="w-5 h-5" />
                  <span>Death Claim</span>
                </div>
                <ChevronRightIcon className="w-5 h-5" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <WalletIcon className="w-5 h-5" />
                  <span>Withdrawal</span>
                </div>
                <ChevronRightIcon className="w-5 h-5" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ArchiveIcon className="w-5 h-5" />
                  <span>Digital AAN</span>
                </div>
                <ChevronRightIcon className="w-5 h-5" />
              </div>
              <Separator />
              <Button variant="outline" className="w-full justify-start">
                <PlusIcon className="w-4 h-4 mr-2" />
                SUBMIT MANUAL FORM
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainWrapper>
  );
}
