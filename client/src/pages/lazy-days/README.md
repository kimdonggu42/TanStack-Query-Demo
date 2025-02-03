# 쿼리 상태 감지

## 1. useIsFetching을 사용하여 전역적인 쿼리 상태 감지

### 1. useIsFetching으로 전역 로딩 상태 감지

- useIsFetching은 현재 fetching 중인 모든 쿼리 개수를 반환하여, 앱 내에서 네트워크 요청 상태를 전역적으로 감지하는 데 유용하다.

- useIsFetching은 앱 전체의 로딩 상태를 감지하여 전역적인 로딩 UI를 표시할 수 있으며, 여러 개의 쿼리를 동시에 실행할 때 개별적으로 isFetching을 관리할 필요가 없지만, 특정 쿼리의 로딩 상태만 필요할 경우 추가적인 설정이 필요하다.

```javascript
import { useIsFetching } from '@tanstack/react-query';

const GlobalLoadingIndicator = () => {
  const isFetching = useIsFetching(); // 현재 fetching 중인 쿼리 개수 반환

  return isFetching > 0 ? <p>⏳ 데이터 로딩 중...</p> : <p>✅ 데이터 로드 완료</p>;
};
```

### 2. useIsFetching으로 특정 쿼리 상태 감지

- useIsFetching은 queryKey를 지정하면 특정 데이터 요청만 감지할 수 있으며, 특정 페이지나 API 요청이 실행 중인지 확인하는 데 유용하다.

- useIsFetching은 특정 데이터 요청만 감지하여 불필요한 상태 업데이트를 줄이고 로딩 UI를 최적화할 수 있지만, 여러 개의 쿼리를 감지하려면 useIsFetching을 개별적으로 여러 번 호출해야 한다.

```javascript
const isUsersFetching = useIsFetching({ queryKey: ['users'] });

console.log(isUsersFetching); // 현재 "users" 데이터 가져오는 중인지 확인
```

## 2. useQuery.isFetching을 사용하여 개별 쿼리 상태 감지

- useQuery의 반환값인 isFetching을 사용하면 특정 쿼리의 fetching 상태만 감지할 수 있으며, isLoading과 달리 기존 데이터가 있어도 새로운 데이터를 가져오는 동안 isFetching이 true가 되어 UI에 반영할 수 있다.

- isFetching은 특정 쿼리의 로딩 상태만 감지하여 불필요한 리렌더링을 방지하고, 캐시된 데이터가 있어도 백그라운드에서 데이터를 다시 가져오는 상태를 확인할 수 있지만, 개별적으로 관리해야 하며 전역적인 로딩 상태 관리에는 부적절하다.

```javascript
const { data, isFetching } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});
```

> #### 참고
>
> - [useIsFetching](https://tanstack.com/query/latest/docs/framework/react/reference/useIsFetching#useisfetching)

# 에러 관리

## 1. queryCache의 onError를 사용하여 전역으로 에러를 관리하는 방식

- 모든 useQuery에서 발생하는 에러를 queryCache(TanStack Query의 캐시 저장소로, 모든 쿼리의 상태(로딩, 성공, 실패 등)를 관리함)의 onError에서 자동으로 처리하여 전역적으로 toast를 띄우거나, 공통적인 에러 로직을 실행할 수 있다.

- 에러 핸들링 로직을 한 곳에서 관리할 수 있지만, 특정 쿼리에서 개별적으로 처리하려면 추가 설정이 필요하다.

## 2. useQuery 내부에서 error를 반환하는 방식

- 개별 쿼리에서 에러를 error 변수로 반환하여 특정 컴포넌트에서만 에러 메시지를 보여줄 수 있다.

- 쿼리별로 에러를 개별적으로 처리할 수 있지만, 모든 컴포넌트에서 따로 에러를 처리해야 하므로 중복 코드가 발생할 수 있다.

> #### 참고
>
> - [QueryCache](https://tanstack.com/query/latest/docs/reference/QueryCache#querycache)

# 초기 데이터 프리패칭 옵션

- Tanstack Query에는 초기 데이터를 사전에 로드하여 사용자 경험을 향상시킬 수 있는 다양한 옵션을 제공한다. 캐시에 유효한 데이터라면 추가할 수 있지만, 단순한 placeholder 데이터인 경우 캐시에 추가되지 않는다.

## 1. prefetchQuery

- prefetchQuery를 사용하면 서버에서 데이터를 미리 가져와 캐시에 저장할 수 있다. 페이지 이동 전에 데이터를 미리 로드하여 사용자가 즉시 데이터를 볼 수 있도록 할 때 유용하다.

```javascript
await queryClient.prefetchQuery({
  queryKey: ['users'],
  queryFn: fetchUsers, // 서버에서 데이터 가져오기
});
```

## 2. setQueryData

- setQueryData를 사용하면 클라이언트에서 이미 알고 있는 데이터를 직접 캐시에 추가할 수 있다. 서버 요청 없이 이미 알고 있는 데이터를 캐시에 저장할 때 유용하다.

```javascript
queryClient.setQueryData(['user', userId], { id: userId, name: 'John Doe' });
```

## 3. placeholderData

- placeholderData는 데이터를 로드하는 동안 일시적으로 표시할 데이터를 제공하는 옵션이다. 특정 데이터를 가져오는 동안 로딩 상태를 사용자에게 더 자연스럽게 보여주고 싶을 때 활용된다.

```javascript
const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: fetchUser,
  placeholderData: { id: userId, name: 'Loading...' },
});
```

## 4. initialData

- initialData는 쿼리의 초기 값을 설정하는 옵션이며, 캐시에 저장되는 데이터다. placeholderData와 달리, 유효한 데이터로 간주되어 캐시에 추가된다. SSR(서버 사이드 렌더링)에서 서버에서 받은 데이터를 클라이언트에서 즉시 사용할 때 유용하다.

```javascript
const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: fetchUser,
  initialData: { id: userId, name: 'John Doe' },
});
```

|                 |     사용 위치      | 데이터 출처 | 캐시에 추가 여부 |
| :-------------: | :----------------: | :---------: | :--------------: |
|  prefetchQuery  | queryClient 메서드 |   server    |        O         |
|  setQueryData   | queryClient 메서드 |   client    |        O         |
| placeholderData |   useQuery 옵션    |   client    |        X         |
|   initialData   |   useQuery 옵션    |   client    |        O         |

# 선택 옵션을 사용한 필터링

- TanStack Query는 불필요한 연산을 줄이기 위해 메모이제이션을 활용하여 성능을 최적화하며, 선택 함수(select function)의 결과를 캐싱하고 `===` 비교를 수행하여 데이터 또는 선택 함수가 변경된 경우에만 다시 실행한다.

- 즉, 데이터가 이전과 동일하고, 선택 함수도 변하지 않았다면 불필요한 재계산 없이 기존 결과를 재사용한다.
  이러한 최적화 덕분에 Tanstack Query는 최소한의 연산만 수행하면서도 최신 데이터를 유지할 수 있다.

- TanStack Query에서 `select` 옵션은 쿼리 함수에서 반환된 데이터를 변환하여, 컴포넌트가 필요한 형식으로 가공할 수 있도록 도와준다.

- 뿐만 아니라, 불필요한 연산을 줄이고 성능을 최적화하는 역할도 수행하는데, TanStack Query는 `select` 함수의 실행 결과를 메모이제이션(Memoization) 하며, 이전 데이터와 선택 함수가 변경되지 않았다면 기존 결과를 그대로 재사용한다.

## 1. select를 활용한 데이터 가공

- 기본적으로 `select` 함수에는 쿼리 함수에서 반환된 데이터가 전달된다. 이를 이용해 데이터를 필터링하거나 변환하여 컴포넌트가 원하는 형식으로 가공할 수 있다.

- `fetchUsers()`가 반환한 데이터는 사용자 객체 배열이지만, `select`를 사용해 이름만 추출한 배열을 반환하도록 변경할 수 있다. 이렇게 하면 컴포넌트 내부에서 추가적인 가공 없이 데이터를 바로 사용할 수 있다.

```javascript
const selectFn = (data: UserType[]) => data.map((user) => user.name);

const { data: userNames } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers, // [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
  select: selectUserNames, // ['Alice', 'Bob']
});
```

## 2. select를 사용할 때 주의할 점

- `select` 함수가 매번 새로운 객체를 반환하면 메모이제이션이 제대로 동작하지 않을 수 있으며, 새로운 배열/객체를 반환하는 경우 이전 데이터와 비교가 어려워 불필요한 재렌더링이 발생할 수 있다.

- 위 예시 코드를 보면 `select` 함수가 렌더링될 때마다 새로운 함수를 생성하여 Tanstack Query의 메모이제이션이 제대로 동작하지 않을 수 있다.

- 이를 방지하기 위해 `useCallback`을 사용하여 `selectFn`을 메모이제이션한다. 의존성에 포함된 값이 변경되지 않는 한 `selectFn`이 새로 생성되지 않는다.

```javascript
const selectFn = useCallback((data: UserType[]) => data.map((user) => user.name), [userId]);

const { data: userNames } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
  select: selectFn,
});
```

> #### 참고
>
> - [React Query Data Transformations](https://tkdodo.eu/blog/react-query-data-transformations)
