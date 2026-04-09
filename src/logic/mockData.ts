export const MOCK_PROFILE = {
  firstName: 'Vivek',
  surname: 'Kumar',
  dob: '15/05/1990',
  cprNumber: '150590-1234',
  startDate: '01/01/2024',
  endDate: '01/01/2034',
  passportNumber: 'DK12345678',
  country: 'Denmark',
  flag: '🇩🇰',
};

export const MOCK_VISAS = [
  { id: '1', country: 'United States', flag: '🇺🇸', startDate: '10/02/2024', endDate: '10/02/2026', status: 'Active' },
  { id: '2', country: 'India', flag: '🇮🇳', startDate: '05/03/2023', endDate: '04/03/2024', status: 'Expired' },
  { id: '3', country: 'United Kingdom', flag: '🇬🇧', startDate: '15/06/2024', endDate: '15/06/2025', status: 'Pending' },
];

export const MOCK_RECORDS = [
  { id: '1', country: 'Germany', flag: '🇩🇪', airport: 'FRA', date: '12/03/2024', type: 'Departure' },
  { id: '2', country: 'Germany', flag: '🇩🇪', airport: 'FRA', date: '20/03/2024', type: 'Arrival' },
  { id: '3', country: 'France', flag: '🇫🇷', airport: 'CDG', date: '01/02/2024', type: 'Departure' },
];
