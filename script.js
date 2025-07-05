const slotsContainer = document.getElementById('slots');
const dateInput = document.getElementById('date');
const bookedList = document.getElementById('bookedList');

// Example time slots
const timeSlots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00"
];

let bookings = JSON.parse(localStorage.getItem('bookings')) || {};

dateInput.addEventListener('change', renderSlots);

function renderSlots() {
  const selectedDate = dateInput.value;
  if (!selectedDate) return;

  slotsContainer.innerHTML = '';
  bookedList.innerHTML = '';

  const bookedForDate = bookings[selectedDate] || [];

  // Show slots
  timeSlots.forEach(slot => {
    const btn = document.createElement('div');
    btn.classList.add('slot');
    btn.textContent = slot;

    if (bookedForDate.includes(slot)) {
      btn.classList.add('booked');
      btn.textContent += ' (Booked)';
    } else {
      btn.addEventListener('click', () => bookSlot(selectedDate, slot));
    }

    slotsContainer.appendChild(btn);
  });

  // Show booked slots list
  if (bookedForDate.length > 0) {
    bookedForDate.forEach(s => {
      const li = document.createElement('li');
      li.textContent = s;
      bookedList.appendChild(li);
    });
  } else {
    bookedList.innerHTML = '<li>No bookings for this date.</li>';
  }
}

function bookSlot(date, slot) {
  if (!bookings[date]) {
    bookings[date] = [];
  }

  if (!bookings[date].includes(slot)) {
    bookings[date].push(slot);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    renderSlots();
    alert(`Successfully booked: ${slot} on ${date}`);
  }
}
