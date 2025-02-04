import dayjs from 'dayjs';
import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AppointmentDateMap } from '@/pages/lazy-days/components/appointments/types';
import { getAvailableAppointments } from '@/pages/lazy-days/components/appointments/utils';
import {
  getMonthYearDetails,
  getNewMonthYear,
} from '@/pages/lazy-days/components/appointments/hooks/monthYear';
import { useLoginData } from '@/providers/AuthProvider';
import { axiosInstance } from '@/pages/lazy-days/axiosInstance/instance';
import { queryKeys } from '@/pages/lazy-days/react-query/constants';

const commonOptions = {
  staleTime: 0,
  gcTime: 1000 * 60 * 5,
};

// useQuery 호출을 위한 함수
const getAppointments = async (year: string, month: string): Promise<AppointmentDateMap> => {
  const { data } = await axiosInstance.get(`/appointments/${year}/${month}`);
  return data;
};

// 이 훅의 목적:
//   1. 사용자가 선택한 현재 월/연도(`monthYear`)를 추적
//     1a. 상태를 업데이트할 방법을 제공
//   2. 해당 월/연도의 예약 데이터를 반환
//     2a. `AppointmentDateMap` 형식으로 반환 (날짜별 예약 배열을 포함하는 객체)
//     2b. 인접한 월/연도의 예약을 미리 가져옴 (prefetch)
//   3. 필터 상태(모든 예약 / 가능한 예약)를 추적
//     3a. 현재 `monthYear`에 해당하는 예약 중 적용 가능한 예약만 반환
export const useAppointments = () => {
  // 1: monthYear 상태
  // 현재 날짜를 기준으로 `monthYear` 정보를 가져옴 (기본 상태 값)
  const currentMonthYear = getMonthYearDetails(dayjs());

  // 사용자가 선택한 현재 `monthYear`를 추적하는 상태
  // 훅의 반환 객체에서 이 상태 값을 제공함
  const [monthYear, setMonthYear] = useState(currentMonthYear);

  // 사용자가 월을 변경할 때 `monthYear` 상태를 업데이트하는 함수
  // 훅의 반환 객체에서 제공됨
  const updateMonthYear = (monthIncrement: number): void =>
    setMonthYear((prevData) => getNewMonthYear(prevData, monthIncrement));

  //  2: 예약 필터링
  // 모든 예약을 보여줄지, 가능한 예약만 보여줄지를 결정하는 상태와 함수
  const [showAll, setShowAll] = useState(false);

  // `getAvailableAppointments` 함수가 필요함
  // 로그인한 사용자의 예약을 구별하여 (흰색으로) 표시하기 위해
  // `getAvailableAppointments` 함수에 사용자 정보를 전달해야 함
  const { userId } = useLoginData();

  const selectFn = useCallback(
    (data: AppointmentDateMap, showAll: boolean) => {
      if (showAll) return data;
      return getAvailableAppointments(data, userId);
    },
    [userId],
  );

  // 3: useQuery
  // 현재 `monthYear`에 해당하는 예약을 가져오기 위한 `useQuery` 호출

  const queryClient = useQueryClient();

  useEffect(() => {
    const nextMonthYear = getNewMonthYear(monthYear, 1);
    queryClient.prefetchQuery({
      queryKey: [queryKeys.appointments, nextMonthYear.year, nextMonthYear.month],
      queryFn: () => getAppointments(nextMonthYear.year, nextMonthYear.month),
      ...commonOptions,
    });
  }, [queryClient, monthYear, commonOptions]);

  // 참고 사항:
  //    1. `appointments`는 `AppointmentDateMap` 형식의 객체임
  //       (객체의 속성은 월의 각 날짜이며, 해당 날짜의 예약 배열을 값으로 가짐)
  //
  //    2. `getAppointments` 쿼리 함수는 `monthYear.year` 및 `monthYear.month`가 필요함
  const fallback: AppointmentDateMap = {};

  const { data: appointments = fallback } = useQuery({
    queryKey: [queryKeys.appointments, monthYear.year, monthYear.month],
    queryFn: () => getAppointments(monthYear.year, monthYear.month),
    // 기본적으로 선택 함수에는 useQuery 쿼리 함수에서 반환된 데이터가 전달된다.
    select: (data) => selectFn(data, showAll),
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60,
    ...commonOptions,
  });

  return { appointments, monthYear, updateMonthYear, showAll, setShowAll };
};
