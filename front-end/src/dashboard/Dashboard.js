import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ReservationsList from "../reservations/ReservationsList";
import TablesList from "../tables/TablesList";
import DateNavButtons from "./DateNavButtons";
import ErrorAlert from "../layout/ErrorAlert";
import "./Dashboard.css";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 */
function Dashboard({ date }) {
  
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  // Load Dashboard - reservations and tables, remove loading message //
  useEffect(() => {
    loadReservationsAndTables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  function loadReservations() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  function loadReservationsAndTables() {
    const abortController = new AbortController();
    loadReservations();
    loadTables();
    return () => abortController.abort();
  }


    return (
      <main>
        <div className="dashboard_title">
        <h1>Dashboard</h1>
        </div>

        <ErrorAlert error={reservationsError} setError={setReservationsError} />

        {/* Reservations */}
        <div className="reservations-list">
          <div className="list-title">
            <h3>Reservations for {date}</h3>
          </div>
          <ReservationsList 
            reservations={reservations}
            setReservationsError={setReservationsError}
            loadReservationsAndTables={loadReservationsAndTables} 
          />
        </div>

        <div className="d-md-flex flex-column">
          {!reservations.length && <p>No reservations on this date.</p>}
        </div>

        {/* Button Toolbar */}
        <div>
          <DateNavButtons currentDate={date} />
        </div>

        {/* Tables */}
        <div className="tables-list">
          <div className="d-md-flex mb-3">
            <h3 className="mb-0 list-title">Tables</h3>
          </div>
          {!tables && <p>Loading...</p>}
          <ErrorAlert error={tablesError} setError={setTablesError} />
          <TablesList 
            tables={tables}
            setTablesError={setTablesError}
            loadReservationsAndTables={loadReservationsAndTables} 
          />
        </div>
      </main>
    );
}

export default Dashboard;