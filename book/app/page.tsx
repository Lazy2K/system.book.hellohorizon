"use client";

import { Calendar, DateValue } from "@nextui-org/calendar";
import { Input } from "@nextui-org/input";
import { RadioGroup } from "@nextui-org/radio";
import { today, getLocalTimeZone } from "@internationalized/date";
import { parseDate } from "@internationalized/date";
import { CustomRadio } from "@/components/custom/radio/customradio";
import { useMemo, useState } from "react";
import { Button } from "@nextui-org/button";

const demoTimes = [{ time: "10:30" }];

const validateEmail = (email: string) => {
  if (email === "") return false;
  // Check this REGEX because i'm not 100% sure it's doing what I want
  return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i) ? true : false;
};

const validateDate = (date: DateValue | undefined) => {
  if (date != undefined && date != null) return true;
  return false;
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [date, setDate] = useState<DateValue>();
  const [emailValid, setEmailValid] = useState(false);
  const [dateValid, setDateValid] = useState(false);

  const isValidEmail = useMemo(() => {
    const isValid = validateEmail(email);
    setEmailValid(isValid);
    return isValid;
  }, [email]);

  const isValidDate = useMemo(() => {
    const isValid = validateDate(date);
    setDateValid(isValid);
    return isValid;
  }, [date]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="max-w-96 gap-4 flex flex-col">
        <h1 className="text-5xl font-semibold tracking-tight">
          Book your discovery call
        </h1>
        <Input
          size="lg"
          label="Please enter your email"
          type="email"
          value={email}
          onValueChange={setEmail}
        />
        <div
          className={
            emailValid
              ? "opacity-100 transition-all flex flex-col gap-4"
              : "opacity-30 transition-all flex flex-col gap-4"
          }
        >
          <h1 className="text-3xl font-semibold tracking-tight transition-all">
            Pick a date that suits
          </h1>
          <Calendar
            value={date}
            onChange={setDate}
            minValue={today(getLocalTimeZone())}
            isDisabled={!emailValid}
            calendarWidth="100%"
          />
        </div>
        <div
          className={
            dateValid && emailValid
              ? "opacity-100 transition-all flex flex-col gap-4"
              : "opacity-30 transition-all flex flex-col gap-4"
          }
        >
          <h1 className="text-3xl font-semibold tracking-tight">
            Pick a time that works
          </h1>
          <RadioGroup
            label="Available times"
            className="w-full px-0 mx-0"
            isDisabled={!dateValid || !emailValid}
          >
            {demoTimes.map((item, index) => {
              return <CustomRadio value={item.time}>{item.time}</CustomRadio>;
            })}
          </RadioGroup>
        </div>
        <Button color="primary" className="w-full" size="lg" isDisabled={true}>
          Book Call
        </Button>
      </div>
    </section>
  );
}
