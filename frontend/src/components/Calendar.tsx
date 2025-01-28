// TODO Pop Up when clicked on a date to show that days schedule
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Lecture } from '../types';

interface CalendarProps {
  events: Lecture[];
}

export default function Calendar({ events }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getDayEvents = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getDayEvents(date);
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-2 cursor-pointer transition-colors ${
            isToday ? 'bg-blue-50' : 'hover:bg-gray-50'
          } ${isSelected ? 'ring-2 ring-indigo-500' : ''}`}
          onClick={() => {
            setSelectedDate(date);
            if (dayEvents.length > 0) {
              setShowModal(true);
            }
          }}
        >
          <div className="flex justify-between">
            <span className={`text-sm ${isToday ? 'font-bold text-blue-600' : ''}`}>
              {day}
            </span>
            {dayEvents.length > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                {dayEvents.length}
              </span>
            )}
          </div>
          <div className="mt-1 space-y-1">
            {dayEvents.slice(0, 2).map((event, index) => (
              <div
                key={event.id}
                className="text-xs truncate text-gray-600 bg-gray-100 rounded px-1 py-0.5"
              >
                {event.name}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Calendar Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            className="p-1.5 hover:bg-gray-100 rounded-full"
            onClick={() => navigateMonth('prev')}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="mx-4 font-semibold text-gray-900">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            type="button"
            className="p-1.5 hover:bg-gray-100 rounded-full"
            onClick={() => navigateMonth('next')}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <button
          type="button"
          className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => setCurrentDate(new Date())}
        >
          Today
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-px mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-sm font-medium text-gray-500 text-center py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Event Modal */}
      {showModal && selectedDate && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="relative bg-white rounded-lg max-w-lg w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setShowModal(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {selectedDate.toLocaleDateString('default', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h3>
                <div className="space-y-4">
                  {getDayEvents(selectedDate).map(event => (
                    <div
                      key={event.id}
                      className="bg-gray-50 p-4 rounded-lg space-y-2"
                    >
                      <h4 className="font-medium text-gray-900">{event.name}</h4>
                      <div className="text-sm text-gray-500">
                        <p>Time: {event.startTime} - {event.endTime}</p>
                        <p>Room: {event.roomNumber}</p>
                        <p>Instructor: {event.instructor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}