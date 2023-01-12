import React from "react";
import { cancelReservation } from "../utils/api";

function CancelReservationButton({ reservation_id, setReservationsError, loadReservationsAndTables }) {

  const handleOk = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const message = "Do you want to cancel this reservation?";
    if (window.confirm(message)) {
      cancelReservation(reservation_id, "cancelled", abortController.signal)
        .then(() => loadReservationsAndTables())
        .catch(setReservationsError);
    }
    return () => abortController.abort();
  };



  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        onClick={handleOk}
        data-reservation-id-cancel={reservation_id}>
          Cancel
      </button>
    </>
  );
}

export default CancelReservationButton;