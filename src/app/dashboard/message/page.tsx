'use client';

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MessagePage() {
  // Dummy data
  const messages = [
    { id: 1, name: "Student 1", text: "Hello" },
    { id: 2, name: "Student 2", text: "Hi!" },
    { id: 3, name: "Student 3", text: "How are you?" },
    { id: 4, name: "Student 4", text: "Good morning" },
  ];
  const [selected, setSelected] = React.useState(1);
  const [reply, setReply] = React.useState("");
  const contentRef = React.useRef<HTMLDivElement>(null);


  return (
    <div className="p-4 h-[calc(100vh-68px)] ">
      <div className="flex gap-8 h-full" ref={contentRef}>
        {/* Left: Message list */}
        <div className="h-full w-80 flex flex-col gap-4">
          <Card className="">
            <CardContent className="font-semibold">All Message</CardContent>
          </Card>
          <div
            className="flex-1 overflow-y-auto flex flex-col gap-4"
          >
            {messages.map(msg => (
              <Card
                key={msg.id}
                className={`cursor-pointer  ${selected === msg.id ? "border-blue-500" : ""}`}
                onClick={() => setSelected(msg.id)}
              >
                <CardContent className="flex items-center gap-3 py-4">
                  <Avatar>
                    <AvatarImage src="https://ui-avatars.com/api/?name=User" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{msg.name}</div>
                    <div className="text-gray-600 text-sm">{msg.text}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* Right: Chat box */}
        <Card className="flex-1 flex flex-col !bg-gray-50 rounded-lg p-0">
          <div className="flex-1 " />
          <form
            className="flex items-center gap-2 bg-gray-200 px-4 py-4"
            onSubmit={e => {
              e.preventDefault();
              setReply("");
            }}
          >
            <Input
              type="text"
              placeholder="Reply message"
              value={reply}
              onChange={e => setReply(e.target.value)}
              className="bg-gray-200 border-none focus:ring-0 shadow-none"
            />
            <Button type="submit" size="sm" className="bg-blue-600 text-white">Send</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
