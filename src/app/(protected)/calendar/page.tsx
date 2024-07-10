"use client";
import { getCalendarSessions } from "@/services/CalendarServices";
import { sessionTypesMapping } from "@/constants/session-types.constant";
import formatDate from "@/lib/formatDate";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import CalendarView from "@/components/shared/CalendarView";
import frLocale from "@fullcalendar/core/locales/fr";
import SlotModal from "./components/SlotModal";
import SessionModal from "./components/SessionModal";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const fetchTrainingSessions = async ({ queryKey }) => {
  const [_key, { start, end }] = queryKey;
  const response = await fetch(
    `/api/coaching-sessions?startDate=${start}&endDate=${end}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export default function Page() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [sessionModal, setSessionModal] = React.useState(false);
  const [sessionId, setSessionId] = React.useState("");
  const router = useRouter();
  const [viewDates, setViewDates] = React.useState({
    start: null,
    end: null,
  });
  const prevViewDatesRef = React.useRef(viewDates);
  const { data, refetch } = useQuery({
    queryKey: ["trainingSessions", viewDates],
    queryFn: fetchTrainingSessions,
    enabled: !!viewDates.start && !!viewDates.end,
    select: (data) => {
      try {
        const formattedTreatments = data.map((session) => {
          const sessionTime = new Date(session.time); // Ensure session.time is a Date object
          return {
            id: session.id,
            title: `${sessionTypesMapping[session.sessionType].label} (${
              session.coachAccount.user.firstName
            } ${session.coachAccount.user.lastName}) - ${
              session.organization.name
            }`,
            start: sessionTime,
            end: new Date(sessionTime.getTime() + session.duration * 60000),
            eventColor: sessionTypesMapping[session.sessionType].color,
          };
        });
        return formattedTreatments;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onCellSelect = (event) => {};

  const onEventClick = (arg) => {
    setSessionId(arg.event.id);
    setSessionModal(true);
  };

  const onEventChange = async (arg) => {
    const { start, end, id } = arg.event;
    console.log("xxx");
    const response = await fetch(`/api/coaching-sessions`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, start, end }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  };

  const handleViewChange = (info) => {
    const newViewDates = {
      start: info.start,
      end: info.end,
    };

    const prevStart = prevViewDatesRef.current.start
      ? prevViewDatesRef.current.start.getTime()
      : null;
    const prevEnd = prevViewDatesRef.current.end
      ? prevViewDatesRef.current.end.getTime()
      : null;
    const newStart = newViewDates.start.getTime();
    const newEnd = newViewDates.end.getTime();

    if (newStart !== prevStart || newEnd !== prevEnd) {
      setViewDates(newViewDates);
      prevViewDatesRef.current = newViewDates;
    }
  };

  function getDate(dayString: string) {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();

    if (month.length === 1) {
      month = "0" + month;
    }

    return dayString.replace("YEAR", year).replace("MONTH", month);
  }

  React.useEffect(() => {
    if (viewDates.start && viewDates.end) {
      refetch();
    }
  }, [viewDates, refetch]);

  return (
    <div className="pb-10">
      <div className="relative">
        <Button
          className=" right-[450px]	absolute top-0 h-11"
          size="lg"
          onClick={() => setIsOpen(true)}
        >
          Ajouter un Chréno
        </Button>
        <CalendarView
          datesSet={handleViewChange}
          events={data}
          eventClick={onEventClick}
          select={onCellSelect}
          editable
          eventResize={onEventChange}
          selectable
          eventDrop={onEventChange}
          locale={frLocale}
        />{" "}
        <SlotModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          refetchEvents={refetch}
        />
        <SessionModal
          isOpen={sessionModal}
          setIsOpen={setSessionModal}
          refetchEvents={refetch}
          sessionId={sessionId}
        />
      </div>
    </div>
  );
}
