import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';
import { AppointmentsService } from '../services/appointments.service';

export default function TurnosPage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {
    const res = await AppointmentsService.getMine();

    const mapped = res.data.map((a: any) => ({
      id: a._id,
      title: a.service,
      start: a.date,
      backgroundColor:
        a.status === 'cancelled' ? '#ccc' : '#2563eb',
    }));

    setEvents(mapped);
  }

  async function handleDateClick(arg: any) {
    const confirmed = confirm(
      `¿Querés reservar un turno el ${dayjs(arg.date).format(
        'DD/MM/YYYY HH:mm',
      )}?`,
    );

    if (!confirmed) return;

    try {
      await AppointmentsService.create({
        service: 'Asesoría técnica',
        date: arg.date.toISOString(),
      });

      alert('Turno reservado correctamente');
      loadAppointments();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          'Error reservando turno',
      );
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Mis Turnos</h1>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable
        dateClick={handleDateClick}
        events={events}
        height="auto"
      />
    </div>
  );
}
