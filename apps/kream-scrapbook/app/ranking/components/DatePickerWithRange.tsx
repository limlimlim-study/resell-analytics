"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { ko } from "date-fns/locale";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onSelectRange: (date: DateRange) => void;
}

const modifiers = {
  disabled: {
    before: new Date("2024-06-23"),
    after: new Date(),
  },
};

export function DatePickerWithRange({ className, onSelectRange }: Props) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -1),
    to: new Date(),
  });

  useEffect(() => {
    if (onSelectRange) {
      if (!date) return;
      onSelectRange(date);
    }
  }, [date, onSelectRange]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "PPP", { locale: ko })} -{" "}
                  {format(date.to, "PPP", { locale: ko })}
                </>
              ) : (
                format(date.from, "PPP", { locale: ko })
              )
            ) : (
              <span>날짜를 선택하세요</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            modifiers={modifiers}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
