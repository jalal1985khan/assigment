'use client'
import * as React from "react"
import Link from "next/link";
import { useEffect, useState } from 'react';
import axios from 'axios'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown, Plus, X } from "lucide-react"


export default function LeftData() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://demo6396395.mockable.io/bcf-boards');
        setData(response.data.boards);
        console.log(response.data.boards)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="p-4">
      <Link href="/" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mb-4">Home</Link>
      <div className="grid gap-4 md:gap-12 lg:grid-cols-1 xl:grid-cols-1">
        <Accordion type="single" collapsible className="w-full">

          {data.map((board: any) => (
            <AccordionItem value={board.id} key={board.id}>
              <AccordionTrigger>{board.name}</AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="w-full">
                  {board.bcfs.map((bcf: any) => (
                    <AccordionItem value={bcf.id} key={bcf.id}>
                      <AccordionTrigger>{bcf.name}</AccordionTrigger>
                      <AccordionContent>

                        <Collapsible
                          open={isOpen}
                          onOpenChange={setIsOpen}
                          className="w-[350px] space-y-2"
                        >
                          <div className="flex items-center justify-between space-x-4 px-4">
                            <h4 className="text-sm font-semibold">
                              {bcf.name}
                            </h4>
                            <CollapsibleTrigger asChild>
                              <Button variant="ghost" size="sm" className="w-9 p-0">
                                <ChevronsUpDown className="h-4 w-4" />
                                <span className="sr-only">Toggle</span>
                              </Button>
                            </CollapsibleTrigger>
                          </div>

                          <CollapsibleContent className="space-y-2">
                            {bcf.bcfBoards.map((bcfBoard: any) => (
                              <div className="rounded-md border px-4 py-3 font-mono text-sm" key={bcfBoard.id}>
                                {bcfBoard.name}
                              </div>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      </AccordionContent>
                    </AccordionItem>

                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}

        </Accordion>
      </div>
    </div>
  )
}
