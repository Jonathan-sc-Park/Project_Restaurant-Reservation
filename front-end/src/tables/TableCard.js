import React from "react";
import { removeReservation } from "../utils/api";
import "./TableCard.css";

function TableCard({
  table_id,
  table_name,
  capacity,
  reservation_id,
  setTablesError,
  loadReservationsAndTables,
}) {

  // Finishes reservation and removes reservation id from table //
  const handleFinish = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const message = "Is this table ready to seat new guests?";
    if (window.confirm(message)) {
      removeReservation(table_id, abortController.signal)
        .then(() => loadReservationsAndTables())
        .catch(setTablesError);
    }
    return () => abortController.abort(); 
  }


  return (
    <>
      <div className="card">
        <div className="card-body">
          <span className="badge capacity-badge">
            {capacity}
          </span>

          <h6 className="card-title">{table_name}</h6>
          <p className="card-subtitle mb-2 text-muted">Reservation {reservation_id}</p>
          <div 
            className={`alert ${reservation_id ? "alert-warning" : "alert-success"}`} 
            id="statusWithFinishButton"
            role="alert" 
            data-table-id-status={table_id}>
              {reservation_id ? "Occupied" : "Free"}
              {reservation_id && 
                <button 
                  type="button" 
                  className="btn"
                  id="finishButton"
                  onClick={handleFinish}
                  data-table-id-finish={table_id}>
                    Finish
                </button>
              }
          </div>
        </div>
      </div>
    </>
  );
}

export default TableCard;