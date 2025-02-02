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
