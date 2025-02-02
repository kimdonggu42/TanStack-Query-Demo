import dayjs from 'dayjs';

// 현재 월/연도 정보를 저장하는 인터페이스
export interface MonthYear {
  startDate: dayjs.Dayjs; // 해당 월의 첫째 날
  firstDOW: number; // 해당 월의 첫 번째 요일 (0 === 일요일)
  lastDate: number; // 해당 월의 마지막 날짜
  monthName: string; // 해당 월의 이름 (예: January)
  month: string; // 두 자리 숫자로 된 월 (예: 01, 02)
  year: string; // 네 자리 숫자로 된 연도 (예: 2024)
}

// MonthYear 값을 증가시킬 때 사용하는 함수
export const getUpdatedMonthYear = (monthYear: MonthYear, monthIncrement: number): dayjs.Dayjs => {
  // clone()을 사용하여 기존 객체를 변경하지 않도록 복사본을 생성
  return monthYear.startDate.clone().add(monthIncrement, 'months');
};

// 특정 날짜가 속한 월의 캘린더 관련 정보를 가져오는 함수
export const getMonthYearDetails = (initialDate: dayjs.Dayjs): MonthYear => {
  const month = initialDate.format('MM'); // 월을 두 자리 숫자로 포맷
  const year = initialDate.format('YYYY'); // 연도를 네 자리 숫자로 포맷
  const startDate = dayjs(`${year}${month}01`); // 해당 월의 첫째 날
  const firstDOW = Number(startDate.format('d')); // 첫 번째 요일 (0: 일요일, 1: 월요일 ...)
  const lastDate = Number(startDate.clone().endOf('month').format('DD')); // 해당 월의 마지막 날짜
  const monthName = startDate.format('MMMM'); // 해당 월의 이름 (예: January)
  return { startDate, firstDOW, lastDate, monthName, month, year };
};

// 현재 MonthYear에서 지정된 개월 수만큼 이동한 새로운 MonthYear 객체를 반환하는 함수
export const getNewMonthYear = (prevData: MonthYear, monthIncrement: number): MonthYear => {
  // 기존 MonthYear에서 지정된 개월 수만큼 증가
  const newMonthYear = getUpdatedMonthYear(prevData, monthIncrement);

  // 새로운 MonthYear에 대한 세부 정보를 반환
  return getMonthYearDetails(newMonthYear);
};
