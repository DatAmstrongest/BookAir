import React, { useEffect, useState } from 'react';
import './Bookings.css';

const API = 'http://127.0.0.1:5000';

type BookingRow = {
  _id: string;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  status: number;
  updatedAt: string;
  createdAt: string;
};

/** Matches numeric `status` values used in V1__Initial_Bookings.js */
function statusLabel(status: number): string {
  switch (status) {
    case 1:
      return 'Scheduled';
    case 2:
      return 'Completed';
    default:
      return `Status ${status}`;
  }
}

function formatRange(startIso: string, endIso: string): string {
  const opts: Intl.DateTimeFormatOptions = {
    dateStyle: 'medium',
    timeStyle: 'short',
  };
  const start = new Date(startIso);
  const end = new Date(endIso);
  return `${start.toLocaleString(undefined, opts)} → ${end.toLocaleString(undefined, opts)}`;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`${API}/api/bookings`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not load bookings');
        return res.json();
      })
      .then((data: BookingRow[]) => {
        if (!cancelled) setBookings(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setError('Unable to reach the server. Is the API running on port 5000?');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bookings-page">
      <header className="bookings-header">
        <h1>Bookings</h1>
        <p className="bookings-lead">
          Events loaded from your database (same fields as the initial migration: title, description,
          category, dates, and status).
        </p>
      </header>

      {loading && <p className="bookings-status">Loading…</p>}
      {error && (
        <div className="bookings-error" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <p className="bookings-empty">No bookings yet. Run migrations and ensure the API is connected to the same database.</p>
      )}

      <ul className="bookings-list">
        {bookings.map((b) => (
          <li key={b._id} className="booking-card">
            <div className="booking-card-top">
              <h2 className="booking-title">{b.title}</h2>
              <span className={`booking-status booking-status--${b.status}`}>{statusLabel(b.status)}</span>
            </div>
            {b.category ? <span className="booking-category">{b.category}</span> : null}
            <p className="booking-description">{b.description}</p>
            <p className="booking-dates">{formatRange(b.startDate, b.endDate)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
